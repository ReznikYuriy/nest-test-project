import { Order } from '../core/models';
import { ORDER_REPOSITORY } from '../core/constants';

export const orderProviders = [
  {
    provide: ORDER_REPOSITORY,
    useValue: Order,
  },
];
