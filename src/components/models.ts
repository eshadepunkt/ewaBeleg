export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export default interface ResponseData {
  data: Book[];
}
