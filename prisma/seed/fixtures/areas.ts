import * as csv from 'csv-parser'
import { join } from 'path'
import { createReadStream } from 'fs'
import { Country, PrismaClient } from '@prisma/client'
import { AreaData, CountryData } from '../interfaces'

import parserVn from '../parsers/areas/vn'

const countries = [
  {
    code: 'vn',
    name: 'Việt Nam',
    assetPath: '../assets/vn_220521.csv',
    parser: parserVn
  }
]

const cache = {}

interface CountryIdAndCode {
  countryId: number
  code: string
}

const findAreaByCountryIdAndCode = async (prisma: PrismaClient, { countryId, code }: CountryIdAndCode) => {
  cache[countryId] ||= {}
  cache[countryId][code] ||= await prisma.area.findUnique({
    where: {
      countryId_code: {
        countryId,
        code
      }
    }
  })

  return cache[countryId][code]
}

const upsertCountry = async (prisma: PrismaClient, data: CountryData) => {
  const { code, name } = data

  console.log("Upsert country with data: " + JSON.stringify(data))

  const country = await prisma.country.upsert({
    where: {
      code
    },
    update: {
      name
    },
    create: {
      code,
      name
    }
  })

  console.log("Country upserted with id: " + country.id)

  return country
}

const upsertArea = async (prisma: PrismaClient, country: Country, data: AreaData) => {
  console.log(`Upsert area of country ${JSON.stringify(country)} with data: ${JSON.stringify(data)}`)

  const { code, name, level, type, parentCode } = data
  const countryId = country.id
  const parent = parentCode
    ? await findAreaByCountryIdAndCode(prisma, { countryId, code: parentCode })
    : undefined

  const area = await prisma.area.upsert({
    where: {
      countryId_code: {
        code,
        countryId
      }
    },
    update: {
      name,
      type,
      level,
      ...(parent && {
        parentId: parent.id
      })
    },
    create: {
      code,
      countryId,
      name,
      type,
      level,
      ...(parent && {
        parentId: parent.id
      })
    }
  })

  console.log("Area upserted with id: " + area.id)

  return area
}

const loadAreas = (assetPath: string) => new Promise((resolve, reject) => {
  const results = []

  createReadStream(join(__dirname, assetPath))
    .pipe(csv())
    .on('data', data => results.push(data))
    .on('end', () => resolve(results))
    .on('error', error => reject(error))
})

export default async function seedAreas(prisma: PrismaClient) {
  console.group(`Seeding areas`)

  for (const { code, name, assetPath, parser } of countries) {
    const country = await upsertCountry(prisma, { code, name })
    const areasData = await loadAreas(assetPath) as any[]
    const countryId = country.id
    const upsertedAreaIds = []

    for (const data of areasData) {
      const areaData = parser(data)

      if (!areaData) continue

      const area = await upsertArea(prisma, country, areaData)

      // Early cache area
      cache[countryId] ||= {}
      cache[countryId][area.code] ||= area

      // Save upserted area's id to archive others later
      upsertedAreaIds.push(area.id)
    }

    await prisma.area.updateMany({
      where: {
        countryId,
        id: {
          notIn: upsertedAreaIds
        }
      },
      data: {
        archived: true
      }
    })
  }

  console.groupEnd()
}