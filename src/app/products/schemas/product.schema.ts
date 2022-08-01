import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false, collection: 'products' })
export class Product {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  sku: string;

  @Prop()
  price: number;

  @Prop()
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
