import http from 'src/http-common';

class BookDataService {
  getNew(): Promise<any> {
    return http.get('/new');
  }
}

export default new BookDataService();
