import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSizesDto {
  @ApiProperty({ 
    description: 'The name of the size', 
    example: 'XL' 
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'A brief description of the size', 
    example: 'Extra Large size fits chest size 42-44 inches' 
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ 
    description: 'The ID of the category this size belongs to', 
    example: 1 
  })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}