import { Guid } from 'guid-typescript';

export interface Book {
  ID?: number;
  title: string;
  subtitle?: string;
  isbn13: string;
  price: string;
  image: string;
  url?: string;
  authors?: string;
  publisher?: string;
  isbn10?: string;
  pages?: number;
  year?: number;
  rating?: string;
  desc?: string;
  pdf?: unknown;
  stock?: number;
}

export interface PDF {
  Chapter: string;
}
export interface ResponseData {
  books: Book[];
  error: string;
  total: string;
  page: string;
}

export interface SessionResponse {
  id: string;
}

export interface Response {
  data: ResponseData;
}

//export interface ResponseDataLocal {
//  books: Book[];
//}
export interface ResponseSingleItem {
  data: Book;
}
export interface ResponseLocal {
  data: Book[];
}

export interface IOrder {
  id: string;
  item: Book;
  quantity: number;
}

export interface IShoppingCart {
  id: string;
  orders: IOrder[];

  getId(): string;
  addOrder: (order: IOrder) => void;
  removeOrder: (order: IOrder) => void;
  checkOut: () => void;
}

export class Order implements IOrder {
  id: string;
  item: Book;
  quantity: number;

  constructor(item: Book, quantity: number) {
    this.id = Guid.create().toString();
    this.item = item;
    this.quantity = quantity;
  }
}
