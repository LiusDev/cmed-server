import { Test, TestingModule } from '@nestjs/testing';
import { Service2Controller } from './service2.controller';

describe('Service2Controller', () => {
  let controller: Service2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Service2Controller],
    }).compile();

    controller = module.get<Service2Controller>(Service2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
