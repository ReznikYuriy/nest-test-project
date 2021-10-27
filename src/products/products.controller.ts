import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { IProduct } from './interfaces';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get()
  async findAll(): Promise<IProduct[]> {
    return await this.productService.findAllProducts();
  }
  @Get(':id')
  async findById(@Param('id') id: string): Promise<IProduct> {
    return await this.productService.findProductById(id);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<IProduct> {
    return await this.productService.createProduct(createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    return await this.productService.updateProductById(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IProduct> {
    return await this.productService.deleteProductById(id);
  }
}
