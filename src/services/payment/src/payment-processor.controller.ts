import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentProcessorService } from './payment-processor.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller()
export class PaymentProcessorController {
  constructor(private readonly paymentService: PaymentProcessorService) {}

  @MessagePattern('createPayment')
  create(@Payload() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @MessagePattern('findAllPayment')
  findAll() {
    return this.paymentService.findAll();
  }

  @MessagePattern('findOnePayment')
  findOne(@Payload() id: number) {
    return this.paymentService.findOne(id);
  }

  @MessagePattern('updatePayment')
  update(@Payload() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(updatePaymentDto.id, updatePaymentDto);
  }

  @MessagePattern('removePayment')
  remove(@Payload() id: number) {
    return this.paymentService.remove(id);
  }
}
