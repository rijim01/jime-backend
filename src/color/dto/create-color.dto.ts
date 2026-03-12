import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({ 
    description: 'The name of the color', 
    example: 'Midnight Blue' 
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'The hex code of the color', 
    example: '#191970',
    required: false 
  })
  @IsOptional()
  @IsString()
  @Length(4, 7) 
  hex_code: string;
}