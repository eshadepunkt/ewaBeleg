import { IOrder, IShoppingCart } from '../models';
import { Guid } from 'guid-typescript';

export class ShoppingCart implements IShoppingCart {
  id: string;
  orders: IOrder[];
  constructor() {
    this.orders = Array<IOrder>();
    this.id = Guid.create().toString();
  }
  public getId(): string {
    return this.id;
  }
  addOrder(order: IOrder) {
    if (order !== null) {
      this.orders.push(order);
    }
  }
  removeOrder(order: IOrder) {
    if (order !== null) {
      this.orders.splice(this.orders.indexOf(order));
    }
  }
  checkOut() {
    throw Error;
  }
}
