import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSizesDto } from './dto/create-sizes.dto';
import { UpdateSizesDto } from './dto/update-sizes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/sizes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async create(createSizeDto: CreateSizesDto) {
    const size = this.sizeRepository.create(createSizeDto);
    return await this.sizeRepository.save(size);
  }
}
