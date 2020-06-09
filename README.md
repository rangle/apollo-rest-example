# apollo-rest-example

Demo of using REST calls via Apollo Server

## Start API Server

```bash
cd graphql-server
yarn start # or `yarn watch` for dev
```

Changes are only stored in memory, so all data is reset when restarting the server.

You can see all data via `http://localhost:8080/books`.

## Start Apollo Server

```bash
cd graphql-server
yarn start # or `yarn watch` for dev
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

Adds a new entry

```GraphQL
mutation {
  addBook(input: { title: "Another exciting book", author: "Stephen King" }) {
    title
    author
  }
}
```

## Put data

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
