import { RESTDataSource } from "apollo-datasource-rest";

export default class BooksAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080/";
  }

  async getBook(id: number) {
    return this.get(`books/${id}`);
  }

  async getBooks(id: number) {
    return this.get(`books`);
  }

  async getMostViewedMovies(limit = 10) {
    const data = await this.get("books");
    console.log(data);
    return data.results;
  }
}
