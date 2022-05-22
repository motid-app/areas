import { AreaData, AreaType } from "prisma/seed/interfaces"

interface Types {
  [key: string]: AreaType
}

interface Area {
  code: string
  name: string
  type: string
  parent1Code: string
  parent2Code: string
}

const types: Types  = {
  'Thành phố Trung ương': 'municipality',
  'Tỉnh': 'province',
  'Thành phố': 'city',
  'Quận': 'urban_district',
  'Thị xã': 'town',
  'Huyện': 'district',
  'Phường': 'ward',
  'Thị trấn': 'township',
  'Xã': 'commune'
}

const typeReg = new RegExp(`^(${Object.keys(types).join('|')})\s*`, 'g')

export default function parserVn(area: Area): AreaData | undefined {
  const { code, name, type, parent1Code, parent2Code } = area

  if (!code) return

  return {
    code,
    name: name.replace(typeReg, '').trim(),
    type: types[type],
    level: parent1Code ? 3 : parent2Code ? 2 : 1,
    parentCode: parent1Code || parent2Code || undefined,
  }
}