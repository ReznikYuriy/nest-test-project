import { Order, ProductOrder } from '../core/models';
import { ORDER_REPOSITORY, PRODUCT_ORDER_REPOSITORY } from '../core/constants';

export const orderProviders = [
  {
    provide: ORDER_REPOSITORY,
    useValue: Order,
  },
  {
    provide: PRODUCT_ORDER_REPOSITORY,
    useValue: ProductOrder,
  },
];
