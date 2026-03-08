import { Injectable } from '@nestjs/common';
import { CreateSizedDto } from './dto/create-sized.dto';
import { UpdateSizedDto } from './dto/update-sized.dto';

@Injectable()
export class SizedService {
  create(createSizedDto: CreateSizedDto) {
    return 'This action adds a new sized';
  }

  findAll() {
    return `This action returns all sized`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sized`;
  }

  update(id: number, updateSizedDto: UpdateSizedDto) {
    return `This action updates a #${id} sized`;
  }

  remove(id: number) {
    return `This action removes a #${id} sized`;
  }
}
