// color.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';


@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
  ) {}

  create(dto: CreateColorDto) {
    return this.colorRepository.save(this.colorRepository.create(dto));
  }

  findAll() {
    return this.colorRepository.find();
  }

  async findOne(id: number) {
    const color = await this.colorRepository.findOneBy({ id });
    if (!color) throw new NotFoundException(`Color with ID ${id} not found`);
    return color;
  }

  async update(id: number, dto: UpdateColorDto) {
    const color = await this.findOne(id); 
    if(!color) {
      throw new NotFoundException(`Color with ID ${id} not found`);
    }
    return this.colorRepository.update(id, dto);
  }

  async remove(id: number) {
    const color = await this.findOne(id);
    return this.colorRepository.remove(color);
  }
}