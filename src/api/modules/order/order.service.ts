import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxyTokenEnum } from '../../common/enums/client-proxy-token.enum';
import { firstValueFrom } from 'rxjs';
import { MessagePatternEnum } from 'src/lib/message-broker/enums/message-pattern.enum';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ClientProxyTokenEnum.ORDER_PUBLISHER)
    private readonly clientProxy: ClientProxy
  ) { }

  public async create(createOrderDto: CreateOrderDto) {
    

    return firstValueFrom(this.clientProxy.send(MessagePatternEnum.ORDER_CREATE, createOrderDto));
  }

  public async findAll() {
    return `This action returns all order`;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  public async update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
