import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateProductCommand } from './commands';
import { ProductDto } from './dtos';

@Controller()
export class ProductsController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: 'add-product' })
  async addProduct(@Payload() productDto: string, @Ctx() context: RmqContext) {
    Logger.log(`Payload: ${productDto}`);
    const command = new CreateProductCommand(JSON.parse(productDto));
    await this.commandBus.execute(command);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
