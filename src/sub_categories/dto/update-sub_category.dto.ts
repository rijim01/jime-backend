import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Status } from 'src/common/entities/abstract-base.entity';
import { CreateSubCategoryDto } from './create-sub_category.dto';

export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
