import { Test, TestingModule } from '@nestjs/testing';
import { VeramoController } from './veramo.controller';
import { VeramoService } from './veramo.service';

describe('VeramoController', () => {
  let controller: VeramoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeramoController],
      providers: [VeramoService],
    }).compile();

    controller = module.get<VeramoController>(VeramoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
