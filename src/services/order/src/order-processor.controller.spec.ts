import { Test, TestingModule } from '@nestjs/testing';
import { OrderProcessorController } from './order-processor.controller';
import { OrderProcessorService } from './order-processor.service';

describe('OrderProcessorController', () => {
  let controller: OrderProcessorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderProcessorController],
      providers: [OrderProcessorService],
    }).compile();

    controller = module.get<OrderProcessorController>(OrderProcessorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
