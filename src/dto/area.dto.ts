import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class QueryAreasDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => value.split(',').map(Number))
  readonly ids: number[]

  @ApiProperty({ required: false })
  @IsOptional()
  readonly code: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly level: number

  @ApiProperty({ required: false })
  @IsOptional()
  readonly type: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly parentId: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly countryId: number
}