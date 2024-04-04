import { Test, TestingModule } from '@nestjs/testing';
import { ConstServicesService } from './const-services.service';

describe('ConstServicesService', () => {
  let service: ConstServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstServicesService],
    }).compile();

    service = module.get<ConstServicesService>(ConstServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
