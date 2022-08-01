import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const user: string = process.env.RMQ_USER;
  const password: string = process.env.RMQ_PASS;
  const host: string = process.env.RMQ_HOST;
  const queueName: string = process.env.RMQ_QUEUE_NAME;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}`],
        queue: queueName,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.listen();
}
bootstrap();
