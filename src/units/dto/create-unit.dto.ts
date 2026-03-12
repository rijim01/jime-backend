import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitDto {
  @ApiProperty({ example: 'Kilogram', description: 'Full name of the unit' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'kg', description: 'Abbreviation of the unit' })
  @IsNotEmpty()
  @IsString()
  short_name: string;
}