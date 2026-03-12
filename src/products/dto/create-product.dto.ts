import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {

  @ApiProperty({
    example: "mens-shoes"
  })
  @IsString()
  @IsNotEmpty()
  subcategory: string;

  @ApiProperty({
    example: "Nike Air Max"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Premium running shoe"
  })
  @IsString()
  description: string;

  /* @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
    required: true,
    description: "Upload product images"
  })
  images: any[]; */
}