import { Test, TestingModule } from '@nestjs/testing';
import { PaymentProcessorController } from './payment-processor.controller';
import { PaymentProcessorService } from './payment-processor.service';

describe('PaymentProcessorController', () => {
  let controller: PaymentProcessorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentProcessorController],
      providers: [PaymentProcessorService],
    }).compile();

    controller = module.get<PaymentProcessorController>(PaymentProcessorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
