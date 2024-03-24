import { Test, TestingModule } from '@nestjs/testing';
import { bannersController } from './banner.controller';

describe('BannersController', () => {
  let controller: bannersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [bannersController],
    }).compile();

    controller = module.get<bannersController>(bannersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
