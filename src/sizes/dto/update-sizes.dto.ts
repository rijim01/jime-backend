import { PartialType } from '@nestjs/swagger';
import { CreateSizesDto } from './create-sizes.dto';

export class UpdateSizesDto extends PartialType(CreateSizesDto) {}
