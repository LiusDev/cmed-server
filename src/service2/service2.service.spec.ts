import { Test, TestingModule } from '@nestjs/testing';
import { Service2Service } from './service2.service';

describe('Service2Service', () => {
  let service: Service2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Service2Service],
    }).compile();

    service = module.get<Service2Service>(Service2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
