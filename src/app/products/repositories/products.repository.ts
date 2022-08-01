import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private model: Model<ProductDocument>,
  ) {}

  async create(product: Product) {
    return await this.model.create(product);
  }
}
