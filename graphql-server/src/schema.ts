import { gql } from "apollo-server";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries/mutations that are executed against
// your data.
export const typeDefs = gql`
  # This "Book" type defines the queryable fields for every book in our data source.
  "Type matching what is returned from the API Server"
  type Book {
    "Title of the book"
    title: String
    "Author of the book"
    author: String
  }

  "Type to POST/PUT books"
  input BookInput {
    "Title of the book"
    title: String!
    "Author of the book"
    author: String!
  }

  # The "Query" type is special: it lists all of the available
  # read operations and their return types
  type Query {
    "GETs all books from the API Server"
    books: [Book]
    "GETs a book by its index from the API Server"
    book(id: ID!): Book
  }

  # The "Mutation" type is special: it lists all of the available
  # write operations and their return types
  type Mutation {
    "POSTs a new book to the API Server"
    addBook(input: BookInput): Book
    "PUTs an existing book to the API Server"
    updateBook(id: ID!, input: BookInput): Book
  }
`;
