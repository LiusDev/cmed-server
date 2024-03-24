import { Test, TestingModule } from '@nestjs/testing';
import { slidersController } from './slider.controller';

describe('SlidersController', () => {
  let controller: slidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [slidersController],
    }).compile();

    controller = module.get<slidersController>(slidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
