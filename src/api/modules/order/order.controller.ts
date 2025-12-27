import { Controller, Get, Post, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';

import { OrderService } from './order.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderFiltersDto } from './dto/order-filters.dto';
import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { Order } from '../../../lib/database/entities/order.entity';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  public async create(@Body() dto: CreateOrderDto): Promise<BaseResponseDto<Order>> {
    return this.orderService.create(dto);
  }

  @Get()
  public async findAll(@Param() dto: OrderFiltersDto) {
    return this.orderService.findAll(dto);
  }

  @Post(':id/cancel')
  public async cancel(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.cancel(id);
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }
}
