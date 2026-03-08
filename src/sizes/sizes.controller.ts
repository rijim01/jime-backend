import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  HttpCode, 
  HttpStatus, 
  UseGuards 
} from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateSizesDto } from './dto/create-sizes.dto';
import { UpdateSizesDto } from './dto/update-sizes.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/auth/guard/jwt-auth.guard';

@ApiTags('Sizes')
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new size for a category' })
  async create(@Body() createSizesDto: CreateSizesDto) {
    return await this.sizesService.create(createSizesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all sizes (Optionally filtered by categoryId)' })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  async findAll(@Query('categoryId') categoryId?: string) {
    return await this.sizesService.findAll(categoryId ? +categoryId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific size' })
  async findOne(@Param('id') id: string) {
    return await this.sizesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update an existing size' })
  async update(
    @Param('id') id: string, 
    @Body() updateSizesDto: UpdateSizesDto
  ) {
    return await this.sizesService.update(+id, updateSizesDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete a size' })
  async remove(@Param('id') id: string) {
    return await this.sizesService.remove(+id);
  }
}