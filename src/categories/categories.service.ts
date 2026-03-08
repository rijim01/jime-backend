import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import slugify from 'slugify';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Status } from 'src/common/entities/abstract-base.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const slug = slugify(createCategoryDto.name, { lower: true, strict: true });

    const existing = await this.categoryRepository.findOne({
      where: {
        slug,
        status: Status.ACTIVE,
      },
    });

    if (existing) {
      throw new ConflictException(
        `Category with slug '${slug}' already exists`,
      );
    }

    const category = await this.categoryRepository.create({
      ...createCategoryDto,
      slug,
    });
    const savedCategory = await this.categoryRepository.save(category);
    return {
      message: 'Category created successfully',
      data: savedCategory,
    };
  }

  async findAll() {
    return await this.categoryRepository.find({
      relations: ['subCategories'],
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['subCategories'],
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }


  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (updateCategoryDto.name) {
      const newSlug = slugify(updateCategoryDto.name, {
        lower: true,
        strict: true,
      });

      const exists = await this.categoryRepository.findOne({
      where: {
        slug: newSlug,
        status: Status.ACTIVE
      }
    });
    if(exists && exists.id !== id){
      throw new ConflictException('Category with this name already exists');
    }
    category.slug = newSlug;
    }
    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    await this.categoryRepository.softDelete(id);
    return "Category successfully removed"
  }
}
