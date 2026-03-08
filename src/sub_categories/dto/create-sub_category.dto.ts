import { IsNotEmpty, IsOptional, IsString, IsEnum, MaxLength, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class CreateSubCategoryDto {
  
  @ApiProperty({ description: 'The name of the sub-category' })
  @IsNotEmpty({ message: 'Sub-category name is required' })
  @IsString()
  @Transform(({ value }) => value.trim())
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'The ID of the parent category' })
  @IsNotEmpty({ message: 'Category ID is required' })
  @IsNumber()
  categoryId: number;

  @ApiPropertyOptional({ description: 'URL for the sub-category image' })
  @IsOptional()
  @IsString()
  image_url?: string;
}
