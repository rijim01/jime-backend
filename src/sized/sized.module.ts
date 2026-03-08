import { Module } from '@nestjs/common';
import { SizedService } from './sized.service';
import { SizedController } from './sized.controller';

@Module({
  controllers: [SizedController],
  providers: [SizedService],
})
export class SizedModule {}
