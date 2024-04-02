import { Test, TestingModule } from '@nestjs/testing';
import { HomeServicesService } from './home-services.service';

describe('HomeServicesService', () => {
  let service: HomeServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeServicesService],
    }).compile();

    service = module.get<HomeServicesService>(HomeServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
