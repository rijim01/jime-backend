import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sizes } from './entities/sizes.entity';
import { AuthModule } from 'src/common/auth/module/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sizes]),AuthModule],
  controllers: [SizesController],
  providers: [SizesService],
})
export class SizesModule {}
