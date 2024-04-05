import { Test, TestingModule } from '@nestjs/testing';
import { ConstServicesController } from './const-services.controller';

describe('ConstServicesController', () => {
  let controller: ConstServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstServicesController],
    }).compile();

    controller = module.get<ConstServicesController>(ConstServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
