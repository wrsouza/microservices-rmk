import { ProductDto } from '../../dtos';

export class CreateProductCommand {
  constructor(public readonly productDto: ProductDto) {}
}
