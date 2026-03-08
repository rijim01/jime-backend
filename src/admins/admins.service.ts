import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/common/auth/service/auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { RolesService } from 'src/roles/roles.service';
import { ApiResponse, saltRounds } from 'src/common/interfaces/api-response.interface';
import { Status } from 'src/common/entities/abstract-base.entity';

type AuthAdminResponse = { admin: Admin; token: string };

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly roleService: RolesService,
    private readonly authService: AuthService,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<ApiResponse<AuthAdminResponse>> {
    const { password, email, roleId, ...adminData } = createAdminDto;

    const existingAdmin = await this.adminRepository.findOne({
      where: { email },
    });

    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }

    if (!roleId) {
      throw new BadRequestException('Role ID is required to create an admin');
    }

    const role = await this.roleService.findOne(roleId);

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newAdmin = this.adminRepository.create({
      ...adminData,
      email,
      passwordHash,
      role,
      roleId
    });

    const savedAdmin = await this.adminRepository.save(newAdmin);

    const payload = {
      sub: savedAdmin.id,
      email: savedAdmin.email,
      role: savedAdmin.role.name,
      roleId: savedAdmin.roleId
    };
    const accessToken = this.authService.generateToken(payload);

    return {
      success: true,
      message: 'Admin created successfully',
      data: {
        admin: savedAdmin,
        token: accessToken,
      }
    }
  }

  async login(loginAdminDto: LoginAdminDto): Promise<ApiResponse<AuthAdminResponse>> {
    const { email, password } = loginAdminDto;

    const admin = await this.adminRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'passwordHash'],
      relations: ['role','role.permissions'],
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: admin.id,
      email: admin.email,
      role: admin.role?.name,
    };

    const accessToken = this.authService.generateToken(payload);

     return {
      success: true,
      message: 'Admin has loged in successfully',
      data: {
        admin: admin,
        token: accessToken,
      }
    }
  }

  async findAll():Promise<Admin[]> {
    return await this.adminRepository.find({
      where: {
        status: Status.ACTIVE
      }
    });
  }

  async findOne(id: number) {
    return await this.adminRepository.findOne({
      where: {
        id,
        status: Status.ACTIVE
      }
    })
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
  const admin = await this.adminRepository.findOne({ where: { id } });

  if (!admin) {
    throw new NotFoundException('Admin not found');
  }

  if (updateAdminDto.email && updateAdminDto.email !== admin.email) {
    const existingAdmin = await this.adminRepository.findOne({ 
      where: { email: updateAdminDto.email ,status: Status.ACTIVE } 
    });

    if (existingAdmin) {
      throw new ConflictException('Email is already taken by another admin');
    }
  }
  if (updateAdminDto.password) {
    updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, saltRounds);
  }
 
  if (updateAdminDto.password) {
    updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, saltRounds);
  }

  Object.assign(admin, updateAdminDto);
  return await this.adminRepository.save(admin);
}

  async softDelete(id: number,currentUserId: number) {
    if(currentUserId !== 1){
      throw u
    }
    if(currentUser.id !== id || currentUser.id !== '1') {
      throw new UnauthorizedException('Your dont have the access');
    }
    const admin = await this.adminRepository.findOne({
      where: {
        id,
        status: Status.ACTIVE
      },
    });

    if(!admin) {
      throw new UnauthorizedException('admin not found');
    }
    admin.status = Status.INACTIVE;
    return await this.adminRepository.save(admin);
  }
}
