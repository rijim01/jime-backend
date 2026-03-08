import { IsNotEmpty, IsOptional, IsString, IsEnum, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty} from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'The name of the category' })
  @IsNotEmpty({ message: 'Category name is required' })
  @IsString()
  @Transform(({ value }) => value.trim()) 
  @MaxLength(100)
  name: string;
}