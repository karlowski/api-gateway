import { Test, TestingModule } from '@nestjs/testing';
import { OrderProcessorService } from './order-processor.service';

describe('OrderProcessorService', () => {
  let service: OrderProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderProcessorService],
    }).compile();

    service = module.get<OrderProcessorService>(OrderProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
