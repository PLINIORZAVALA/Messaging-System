import { Controller } from '@nestjs/common';
import { VeramoService } from './veramo.service';

@Controller('veramo')
export class VeramoController {
  constructor(private readonly veramoService: VeramoService) {}
}
