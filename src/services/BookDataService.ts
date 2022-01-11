import http, { dbClient } from 'src/http-common';
import { Book, Response, ResponseSingleItem } from '../components/models';

class BookDataService {
  getNew(): Promise<Response> {
    return http.get('/new');
  }
  getByIsbn13(isbn13: string): Promise<ResponseSingleItem> {
    return http.get(`/books/${isbn13}`);
  }
  getPageById(id: string): Promise<Response> {
    return http.get(`/all?page=${id}`);
  }
  searchByTitle(title: string): Promise<Response> {
    return http.get(`/search/${title}`);
  }
  searchByTitleAndPage(title: string, page: number): Promise<Response> {
    return http.get(`/search/${title}/${page}`);
  }
  getFromDB(): Promise<Response> {
    return dbClient.get('/db_context.php');
  }
  addToDB(item: Book): Promise<unknown> {
    return dbClient.post('/db_context.php', item);
  }
  updateDB(item: Book): Promise<unknown> {
    return dbClient.put('/db_context.php', item);
  }
}

export default new BookDataService();
