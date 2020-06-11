import { Resolvers } from "./generated/graphql";
import { DataSources } from "./data-sources";

/** Gets used in Resolver generation via `graphql-server/codegen.yml`  */
export type Context = { dataSources: DataSources };

/**
 * All resolvers - implementing the `Query` and `Mutation` types of the schema,
 * by calling the data-source(s) to request and send data.
 *
 * _A resolver is a function that's responsible for populating the data for a single field in your schema._
 * https://www.apollographql.com/docs/apollo-server/data/resolvers/
 */
export const resolvers: Resolvers = {
  Query: {
    book: async (parent, { id }, { dataSources }) =>
      dataSources.booksAPI.getBook(parseInt(id)),
    books: async (parent, args, { dataSources }) =>
      dataSources.booksAPI.getBooks(),
  },
  Mutation: {
    addBook: async (parent, { input }, { dataSources }) =>
      dataSources.booksAPI.postBook({ ...input }),
    updateBook: async (parent, { id, input }, { dataSources }) =>
      dataSources.booksAPI.putBook(parseInt(id), { ...input }),
  },
};

// export const resolvers: any = {};
