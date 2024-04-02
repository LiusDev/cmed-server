import { Test, TestingModule } from '@nestjs/testing';
import { HomeServicesController } from './home-services.controller';

describe('HomeServicesController', () => {
  let controller: HomeServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeServicesController],
    }).compile();

    controller = module.get<HomeServicesController>(HomeServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
