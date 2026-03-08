import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}


  @Post('register-customer')
  @ApiOperation({ summary: 'Register a new customer' })
  @ApiResponse({ status: 201, description: 'Customer successfully registered.' })
  @ApiResponse({ status: 409, description: 'Conflict: Email already exists.' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Post('login-customer')
  @HttpCode(HttpStatus.OK) 
  @ApiOperation({ summary: 'Login customer' })
  @ApiResponse({ status: 200, description: 'Customer logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Invalid credentials.' })
  async login(@Body() loginCustomerDto: LoginCustomerDto) {
    return this.customersService.login(loginCustomerDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'find a customer by id'})
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

}


