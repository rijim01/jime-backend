import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiResponse, saltRounds } from 'src/common/interfaces/api-response.interface';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { AuthService } from 'src/common/auth/service/auth.service';
import { Status } from 'src/common/entities/abstract-base.entity';
type AuthCustomerResponse = { customer: Customer; token?: string };

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly authService: AuthService
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<ApiResponse<AuthCustomerResponse>> {
    const { email, password, ...customerData } = createCustomerDto;

    const existingCustomer = await this.customerRepository.findOne({
      where: { email },
    });

    if (existingCustomer) {
      throw new ConflictException('Customer with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newCustomer = this.customerRepository.create({
      ...customerData,
      email,
      passwordHash,
    });

    const savedCustomer = await this.customerRepository.save(newCustomer);

    return {
      success: true,
      message: 'Customer registered successfully',
      data: {
        customer: savedCustomer
      },
    };
  }
  async login(loginCustomerDto: LoginCustomerDto): Promise<ApiResponse<AuthCustomerResponse>> {
    const { email, password } = loginCustomerDto;
    const customer = await this.customerRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'passwordHash'],
    });

    if (!customer) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      customer.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: customer.id,
      email: customer.email
    }

    const accessToken = await this.authService.generateToken(payload);

    return{
      success: true,
      message: 'Customer has loged in successfully',
      data: {
        customer: customer,
        token: accessToken
      }
    }
  }
  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find({
      where: {
        status: Status.ACTIVE
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
