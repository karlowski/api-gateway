import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../../common/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async find() {
    return this.paymentService.find();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }
}
