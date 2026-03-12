import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
  ) {}

  async create(dto: CreateUnitDto) {
    const name = dto.name;
    const existingUnit = await this.unitRepository.findOne({
      where: {
        name
      },
    });

    if (existingUnit) {
      throw new ConflictException('Unit  already exists');
    }

    const newUnit = this.unitRepository.create(dto);
    return await this.unitRepository.save(newUnit);
  }

  findAll() {
    return this.unitRepository.find();
  }

  async remove(id: number) {
    const unit = await this.unitRepository.findOneBy({ id });
    if (!unit) throw new NotFoundException('Unit not found');
    return this.unitRepository.remove(unit);
  }
}
