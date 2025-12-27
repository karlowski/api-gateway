import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { FindOptionsWhere, In, Repository } from 'typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxyTokenEnum } from '../../common/enums/client-proxy-token.enum';
import { MessagePatternEnum } from '../../../lib/message-broker/enums/message-pattern.enum';
import { Order } from '../../../lib/database/entities/order.entity';
import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { OrderFiltersDto } from './dto/order-filters.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { OrderStatusEnum } from '../../../lib/domain/enums/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ClientProxyTokenEnum.ORDER_PUBLISHER)
    private readonly clientProxy: ClientProxy,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { }

  public async create(dto: CreateOrderDto): Promise<BaseResponseDto<Order>> {
    const order = await this.orderRepository.save({ 
      ...dto,
      total: dto.total.toFixed(2),
    });

    firstValueFrom(
      this.clientProxy.send(MessagePatternEnum.ORDER_CREATE, order)
    );

    return {
      message: 'Your order was successfully created',
      data: order,
    }
  }

  public async findAll(filters: OrderFiltersDto): Promise<PaginationDto<Order>> {
    const {
      page,
      take,
      skip,
    } = filters;

    const queryBuilder = this.orderRepository.createQueryBuilder('order');

    // TODO: filters go here...

    const [orders, totalItems] = await queryBuilder
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return new PaginationDto(orders, page, take, totalItems);
  }

  public async findOne(id: number) {
    return this.findById(id, ['payment']);
  }

  public async cancel(id: number): Promise<BaseResponseDto<null>> {
    const order = await this.findById(id, [], {
      status: In([
        OrderStatusEnum.PENDING, 
        OrderStatusEnum.CONFIRMED, 
        OrderStatusEnum.IN_PROGRESS
      ])
    });

    firstValueFrom(
      this.clientProxy.send(MessagePatternEnum.ORDER_CANCEL, order)
    );
    
    return {
      message: 'The order cancellation successfully initiated',
    };
  }

  private async findById(
    id: number, 
    relations: string[] = [], 
    where: FindOptionsWhere<Order> = {}
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        ...where, 
        id, 
      },
      relations,
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
