import { Product } from '../core/models';
import { PRODUCT_REPOSITORY } from '../core/constants';

export const productsProviders = [
  {
    provide: PRODUCT_REPOSITORY,
    useValue: Product,
  },
];
