import http from 'src/http-common';
import { Response } from '../components/models';

class BookDataService {
  getNew(): Promise<Response> {
    return http.get('/new');
  }
  getById(id: string): Promise<Response> {
    return http.get(`/${id}`);
  }
  getPageById(id: string): Promise<Response> {
    return http.get(`/all?page=${id}`);
  }
  getAll(): Promise<Response> {
    return http.get('/all');
  }
  searchByTitle(title: string): Promise<Response> {
    return http.get(`/search/${title}`);
  }
  searchByTitleAndPage(title: string, page: number): Promise<Response> {
    return http.get(`/search/${title}/${page}`);
  }
}

export default new BookDataService();
