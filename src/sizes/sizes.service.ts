import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSizesDto } from './dto/create-sizes.dto';
import { UpdateSizesDto } from './dto/update-sizes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sizes } from './entities/sizes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Sizes)
    private readonly sizeRepository: Repository<Sizes>,
  ) {}

  async create(createSizeDto: CreateSizesDto) {
    const size = this.sizeRepository.create(createSizeDto);
    return await this.sizeRepository.save(size);
  }

  async findAll(categoryId?: number) {
    return await this.sizeRepository.find({
      where: categoryId ? { categoryId } : {},
      relations: ['category'],
    });
  }

  async findOne(id: number) {
    const size = await this.sizeRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!size) {
      throw new NotFoundException(`Size with ID ${id} not found`);
    }
    return size;
  }

  async update(id: number, updateSizeDto: UpdateSizesDto) {
    const existingSize = await this.findOne(id);
    const updatedSize = await this.sizeRepository.save({
      ...existingSize,
      ...updateSizeDto,
    });

    return updatedSize;
  }

  async remove(id: number) {
    const size = await this.sizeRepository.findOne({ where: { id } });
    if (!size) throw new NotFoundException('Size not found');
    return await this.sizeRepository.softRemove(size);
  }
}
