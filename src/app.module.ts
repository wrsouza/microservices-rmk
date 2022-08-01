import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './app/products/products.module';
import * as Joi from 'joi';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RMQ_HOST: Joi.string().required(),
        RMQ_USER: Joi.string().required(),
        RMQ_PASS: Joi.string().required(),
        RMQ_QUEUE_NAME: Joi.string().required(),
        CONNECTION_STRING: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
