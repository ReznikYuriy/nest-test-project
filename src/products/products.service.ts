import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/core/constants';
import { CreateProductDto } from './dto';
import { IProduct } from './interfaces';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  private readonly products: IProduct[] = [];

  /* createProduct(prod: Partial<IProduct>): IProduct {
    const newProd: IProduct = {
      id: Date.now().toString(),
      name: prod.name,
      price: prod.price,
      quantity: prod.quantity,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    this.products.push(newProd);
    return newProd;
  }
 */
  async createProduct(prod: CreateProductDto): Promise<IProduct> {
    return await this.productRepository.create(prod);
  }

  /* findAllProducts(): IProduct[] {
    return this.products;
  } */
  async findAllProducts(): Promise<IProduct[]> {
    return await this.productRepository.findAll();
  }

  /* findProductById(id: string): IProduct {
    return this.products.find((prod) => prod.id === id);
  }
 */
  async findProductById(id: string): Promise<IProduct> {
    return await this.productRepository.findOne<Product>({ where: { id } });
  }

  /* deleteProductById(id: string): IProduct {
    let deletedProd: IProduct = null;
    this.products.forEach((item, i, arr) => {
      if (item.id === id) deletedProd = arr.splice(i, 1)[0];
    });
    return deletedProd;
  } */

  async deleteProductById(id: string): Promise<number> {
    return await this.productRepository.destroy({
      where: {
        id,
      },
    });
  }

  /*  updateProductById(id: string, prod: Partial<IProduct>): IProduct {
    const updProd = this.products.find((prod) => prod.id === id);
    if (updProd) {
      updProd.name = prod.name;
      updProd.price = prod.price;
      updProd.quantity = prod.quantity;
    }
    return updProd;
  } */

  async updateProductById(
    id: string,
    prod: Partial<IProduct>,
  ): Promise<IProduct> {
    const [, [product]] = await this.productRepository.update(prod, {
      where: { id },
      returning: true,
    });
    return product;
  }
}
