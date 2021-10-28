import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ...productsProviders],
})
export class ProductsModule {}
