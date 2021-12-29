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
