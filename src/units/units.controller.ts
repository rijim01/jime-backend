import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UnitService } from './units.service';

@ApiTags('Units')
@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new unit' })
  @ApiBody({ type: CreateUnitDto })
  @ApiResponse({ status: 201, description: 'Unit created successfully' })
  create(@Body() dto: CreateUnitDto) {
    return this.unitService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all units' })
  @ApiResponse({ status: 200, description: 'Returns all units' })
  findAll() {
    return this.unitService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a unit' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Unit deleted successfully' })
  remove(@Param('id') id: string) {
    return this.unitService.remove(+id);
  }
}