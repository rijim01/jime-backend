import { PartialType } from '@nestjs/swagger';
import { CreateSizedDto } from './create-sized.dto';

export class UpdateSizedDto extends PartialType(CreateSizedDto) {}
