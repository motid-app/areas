import { TYPES } from './constants'

export type AreaType = typeof TYPES[number]

export interface AreaData {
  code: string
  name: string
  type: AreaType
  level: number
  parentCode: string | undefined
}

export interface CountryData {
  code: string
  name: string
}