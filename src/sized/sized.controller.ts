import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SizedService } from './sized.service';
import { CreateSizedDto } from './dto/create-sized.dto';
import { UpdateSizedDto } from './dto/update-sized.dto';

@Controller('sized')
export class SizedController {
  constructor(private readonly sizedService: SizedService) {}

  @Post()
  create(@Body() createSizedDto: CreateSizedDto) {
    return this.sizedService.create(createSizedDto);
  }

  @Get()
  findAll() {
    return this.sizedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sizedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSizedDto: UpdateSizedDto) {
    return this.sizedService.update(+id, updateSizedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sizedService.remove(+id);
  }
}
