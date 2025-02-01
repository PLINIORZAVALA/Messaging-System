import { Module } from '@nestjs/common';
import { VeramoService } from './veramo.service';
import { VeramoController } from './veramo.controller';

@Module({
  controllers: [VeramoController],
  providers: [VeramoService],
})
export class VeramoModule {}
