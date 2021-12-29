export interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export interface ResponseData {
  books: Book[];
  error: string;
  total: string;
  page: string;
}

export interface Response {
  data: ResponseData;
}

export interface Order {
  id: string;
  item: Book;
  quantity: number;
}

export interface ShoppingCart {
  id: string;
  orders: Order[];
}
