import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from './entities/sizes.entity';
import { AuthModule } from 'src/common/auth/module/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Size]),AuthModule],
  controllers: [SizesController],
  providers: [SizesService],
})
export class SizesModule {}
