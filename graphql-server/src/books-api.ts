import { RESTDataSource } from "apollo-datasource-rest";

type Book = {
  title: string;
  author: string;
};
/** Data shape returned by the API for `PUT` and `POST` */
type MutationResponse = { status: string; data: Book };

export default class BooksAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080/"; // this sets the base-url for the API
  }

  async getBook(bookId: number) {
    return this.get<Book>(`books/${bookId}`);
  }

  async getBooks() {
    return this.get<Book[]>(`books`);
  }

  async postBook(book: Book) {
    return this.post<MutationResponse>(`books`, book).then((resp) => resp.data);
  }

  async putBook(bookId: number, book: Book) {
    return this.put<MutationResponse>(`books/${bookId}`, book).then(
      (resp) => resp.data
    );
  }
}
