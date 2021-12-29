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
}

export default new BookDataService();
