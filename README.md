# apollo-rest-example

Demo of wrapping a REST API Server via Apollo Server.

- Fully type safe
- Uses [`@graphql-codegen/typescript-resolvers`](https://graphql-code-generator.com/docs/plugins/typescript-resolvers) to auto-generate the resolver types based on the Schema
  See `graphql-server/codegen.yml` for configuration

## Start REST API Server

```bash
cd graphql-server
yarn start # or `yarn watch` for dev
```

_Changes are only stored in memory, so all data is reset when restarting the server._

You can see all currently stored data via [`http://localhost:8080/books`](http://localhost:8080/books).

## Start Apollo Server

```bash
cd graphql-server
yarn start # or `yarn watch` for dev
yarn graphql-generate # generate typings for resolvers based on schema
```

open [`http://localhost:4000/`](http://localhost:4000/) to see the [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/)

# GraphQL Queries

## Get Data

All Books

```GraphQL
{
  books {
    title
    author
  }
}
```

Get the title of the book at index 2

```GraphQL
{
  book(id: 2) {
    title
  }
}
```

## Post data

Adds a new book

```GraphQL
mutation {
  addBook(input: { title: "Another exciting book", author: "Stephen King" }) {
    title
    author
  }
}
```

## Put data

Updates an existing book (by index)

```GraphQL
mutation {
  updateBook(
    id: 2
    input: { title: "Another exciting book", author: "Stephen King" }
  ) {
    title
    author
  }
}
```
