import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './commands';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schemas';
import { ProductsRepository } from './repositories';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [...CommandHandlers, ProductsRepository],
})
export class ProductsModule {}
