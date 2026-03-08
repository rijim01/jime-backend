import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/common/auth/decorator/current-user-decorator';


@ApiBearerAuth('access-token')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('register-admin')
  @ApiOperation({ summary: 'Register a new admin' })
  @ApiResponse({ status: 201, description: 'admin successfully registered.' })
  @ApiResponse({ status: 409, description: 'Conflict: Email already exists.' })
  async create(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminsService.create(createAdminDto);
  }

  @Post('login-admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login admin' })
  @ApiResponse({ status: 200, description: 'admin logged in successfully.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid credentials.',
  })
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return await this.adminsService.login(loginAdminDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'find an admin by id' })
  async findOne(@Param('id') id: string) {
    return await this.adminsService.findOne(+id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'find all active admins'})
  async findAllActiveAdmins() {
    return await this.adminsService.findAll();
  }

  @Get()
  @ApiOperation({summary: 'find all admins'})
  async findAllAdmins() {
    return await this.adminsService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing admin' })
  @ApiResponse({ status: 200, description: 'Admin updated successfully.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return await this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT) 
  @ApiOperation({ summary: 'Delete an admin' })
  @ApiResponse({ status: 204, description: 'Admin deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    return await this.adminsService.softDelete(+id,user);
  }

}
