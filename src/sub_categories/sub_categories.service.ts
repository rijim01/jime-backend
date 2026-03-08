import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { SubCategory } from './entities/sub_category.entity';
import { CreateSubCategoryDto } from './dto/create-sub_category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub_category.dto';


@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const slug = slugify(createSubCategoryDto.name, { lower: true, strict: true });
    const categoryId = createSubCategoryDto.categoryId;
    const existing = await this.subCategoryRepository.findOne({
      where: { slug, categoryId },
    });

    if (existing) {
      throw new ConflictException('Sub-category with this name already exists in this category');
    }

    const subCategory = this.subCategoryRepository.create({
      ...createSubCategoryDto,
      slug,
    });

    return await this.subCategoryRepository.save(subCategory);
  }

  async findAll(categoryId?: number) {
    const where = categoryId ? { categoryId } : {};
    return await this.subCategoryRepository.find({ where, relations: ['category'] });
  }

  async findOne(id: number) {
    const subCategory = await this.subCategoryRepository.findOne({ 
      where: { id },
      relations: ['category'] 
    });
    if (!subCategory) throw new NotFoundException('Sub-category not found');
    return subCategory;
  }

  async update(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    const subCategory = await this.findOne(id);

    if (updateSubCategoryDto.name) {
      subCategory.slug = slugify(updateSubCategoryDto.name, { lower: true, strict: true });
    }

    Object.assign(subCategory, updateSubCategoryDto);
    return await this.subCategoryRepository.save(subCategory);
  }

  async remove(id: number) {
    const subCategory = await this.findOne(id);
    return await this.subCategoryRepository.softRemove(subCategory);
  }
}