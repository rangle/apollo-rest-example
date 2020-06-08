import express from "express";
import books from "./books-data.json";

const app = express();
const port = 8080;

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:bookId", (req, res) => {
  res.json(books[parseInt(req.params["bookId"])]);
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
