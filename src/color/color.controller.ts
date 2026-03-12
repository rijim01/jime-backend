import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';


@ApiTags('Colors') 
@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new color' })
  @ApiBody({ type: CreateColorDto, examples: { 
    example1: { value: { name: 'Red', hex_code: '#FF0000' } } 
  }})
  @ApiResponse({ status: 201, description: 'Color created successfully' })
  create(@Body() dto: CreateColorDto) {
    return this.colorService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all colors' })
  @ApiResponse({ status: 200, description: 'List of all colors' })
  findAll() {
    return this.colorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a color by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Color details' })
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a color' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiBody({ type: UpdateColorDto })
  @ApiResponse({ status: 200, description: 'Color updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateColorDto) {
    return this.colorService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a color' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Color deleted successfully' })
  remove(@Param('id') id: string) {
    return this.colorService.remove(+id);
  }
}