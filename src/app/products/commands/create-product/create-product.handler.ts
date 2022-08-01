import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { ProductsRepository } from '../../repositories';
import { ProductDto } from '../../dtos';
import { Product } from '../../schemas';
import { ObjectId } from 'mongodb';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(private repository: ProductsRepository) {}

  async execute({ productDto }: CreateProductCommand): Promise<void> {
    Logger.log(`Executing Create Product: ${JSON.stringify(productDto)}`);
    Logger.log(productDto.name);
    try {
      const newProduct = new Product();
      newProduct._id = productDto.id;
      newProduct.name = productDto.name;
      newProduct.sku = productDto.sku;
      newProduct.price = productDto.price;
      newProduct.createdAt = new Date(productDto.createdAt);

      await this.repository.create(newProduct);
      Logger.log(`New Product: ${JSON.stringify(newProduct)}`);
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}
