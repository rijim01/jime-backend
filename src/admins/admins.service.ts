import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
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

import {
  ApiResponse,
  saltRounds,
} from 'src/common/interfaces/api-response.interface';
import { Status } from 'src/common/entities/abstract-base.entity';

type AuthAdminResponse = { admin: Admin; token: string };

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly authService: AuthService,
  ) {}

  async create(
    createAdminDto: CreateAdminDto,
  ): Promise<ApiResponse<AuthAdminResponse>> {
    const { password, email, ...adminData } = createAdminDto;

    const existingAdmin = await this.adminRepository.findOne({
      where: { email },
    });

    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }


    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newAdmin = this.adminRepository.create({
      ...adminData,
      email,
      passwordHash,
    });

    const savedAdmin = await this.adminRepository.save(newAdmin);

    const payload = {
      sub: savedAdmin.id,
      email: savedAdmin.email,
      role: savedAdmin.role
    };
    const accessToken = this.authService.generateToken(payload);

    return {
      success: true,
      message: 'Admin created successfully',
      data: {
        admin: savedAdmin,
        token: accessToken,
      },
    };
  }

  async login(
    loginAdminDto: LoginAdminDto,
  ): Promise<ApiResponse<AuthAdminResponse>> {
    const { email, password } = loginAdminDto;

    const admin = await this.adminRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'passwordHash'],
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
      role: admin.role
    };

    const accessToken = this.authService.generateToken(payload);

    return {
      success: true,
      message: 'Admin has loged in successfully',
      data: {
        admin: admin,
        token: accessToken,
      },
    };
  }

  async findAllActive(): Promise<Admin[]> {
    return await this.adminRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminRepository.find();
  }

  async findOne(id: number) {
    return await this.adminRepository.findOne({
      where: {
        id,
        status: Status.ACTIVE,
      },
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    if (updateAdminDto.email && updateAdminDto.email !== admin.email) {
      const existingAdmin = await this.adminRepository.findOne({
        where: { email: updateAdminDto.email, status: Status.ACTIVE },
      });

      if (existingAdmin) {
        throw new ConflictException('Email is already taken by another admin');
      }
    }
    Object.assign(admin, updateAdminDto);
    return await this.adminRepository.save(admin);
  }

  async softDelete(id: number, currentUser: any) {
    const admin = await this.adminRepository.findOne({
      where: {
        id,
        status: Status.ACTIVE,
      },
    });

    if (!admin) {
      throw new NotFoundException('admin not found');
    }
    if (currentUser.role !== 'SUPER_ADMIN' && currentUser.sub !== id) {
      throw new ForbiddenException(
        'You are not authorized to delete this account',
      );
    }
    admin.status = Status.INACTIVE;
    await this.adminRepository.save(admin);

    return {success: true, message: 'Admin soft-deleted successfully'};
  }
}
