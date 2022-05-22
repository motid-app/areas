import { Transform, Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class QueryAreasDto {
  @IsOptional()
  @Transform(({ value }) => value.split(',').map(Number))
  readonly ids: number[]

  @IsOptional()
  readonly code: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly level: number

  @IsOptional()
  readonly type: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly parentId: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly countryId: number
}