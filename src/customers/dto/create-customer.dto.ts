import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  IsPhoneNumber, 
  IsString, 
  MinLength 
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Rahim Ahmed', description: 'The full name of the customer' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'customer@example.com', description: 'Valid email address' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ example: '01712345678', description: 'Customer phone number', required: false })
  @IsOptional()
  @IsPhoneNumber('BD', { message: 'Invalid phone number format' }) // 'BD' ফর বাংলাদেশ
  phone?: string;

  @ApiProperty({ example: '123456', description: 'Password (min 6 chars)' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'Dhaka, Bangladesh', description: 'Shipping address', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;
}