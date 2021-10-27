import { Injectable } from '@nestjs/common';
import { IProduct } from './interfaces';

@Injectable()
export class ProductsService {
  private readonly products: IProduct[] = [];

  createProduct(prod: Partial<IProduct>): IProduct {
    const newProd: IProduct = {
      id: Date.now().toString(),
      name: prod.name,
      price: prod.price,
      quantity: prod.quantity,
      created_at: Date.now().toString(),
    };
    this.products.push(newProd);
    return newProd;
  }

  findAllProducts(): IProduct[] {
    return this.products;
  }

  findProductById(id: string): IProduct {
    return this.products.find((prod) => prod.id === id);
  }

  deleteProductById(id: string): IProduct {
    let deletedProd: IProduct = null;
    this.products.forEach((item, i, arr) => {
      if (item.id === id) deletedProd = arr.splice(i, 1)[0];
    });
    return deletedProd;
  }

  updateProductById(id: string, prod: Partial<IProduct>): IProduct {
    const updProd = this.products.find((prod) => prod.id === id);
    if (updProd) {
      updProd.name = prod.name;
      updProd.price = prod.price;
      updProd.quantity = prod.quantity;
    }
    return updProd;
  }
}
