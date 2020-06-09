import express, { request } from "express";
import bodyParser from "body-parser";
import books from "./books-data.json";

type Book = typeof books[0];

const port = 8080;
const app = express();
/** In-memory dummy data store, pre-populated with books-data */
let dataStore = [...books];

app.use(bodyParser.json());

app.get<{}, Book[]>("/books", (req, res) => {
  res.json(dataStore);
});

app.get<{ bookId: string }, Book>("/books/:bookId", (req, res) => {
  res.json(dataStore[parseInt(req.params.bookId)]);
});

app.post<{}, { status: string; data: Book }, Book>("/books", (req, res) => {
  dataStore.push(req.body);
  const newBookId = dataStore.length - 1;
  res.json({ status: "ok", data: dataStore[newBookId] });
});

app.put<{ bookId: string }, { status: string; data: Book }, Book>(
  "/books/:bookId",
  (req, res) => {
    const bookIdToChange = parseInt(req.params.bookId);
    dataStore = dataStore.map((book, bookId) => {
      if (bookId === bookIdToChange) {
        return req.body;
      }
      return book;
    });
    res.json({ status: "ok", data: dataStore[bookIdToChange] });
  }
);

app.listen(port, () => {
  console.log(`API server started at http://localhost:${port}`);
});
