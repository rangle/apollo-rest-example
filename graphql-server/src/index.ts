import { ApolloServer, IResolvers } from "apollo-server";
import { typeDefs } from "./schema";
import BooksAPI, { Book } from "./books-api";

/** Port for Apollo Server */
const port = 4000;

/**
 * All available Data sources, e.g. from APIs, DBs etc.
 *
 * _Data sources are classes that encapsulate fetching data from a particular service_
 * https://www.apollographql.com/docs/apollo-server/data/data-sources/
 */
const dataSources = () => ({
  booksAPI: new BooksAPI(), // just one for now
});

type DataSources = ReturnType<typeof dataSources>;

/**
 * All resolvers - implementing the `Query` and `Mutation` types of the schema,
 * by calling the data-source(s) to request and send data.
 *
 * _A resolver is a function that's responsible for populating the data for a single field in your schema._
 * https://www.apollographql.com/docs/apollo-server/data/resolvers/
 */
export const resolvers: IResolvers<undefined, { dataSources: DataSources }> = {
  Query: {
    book: async (parent, { id }: { id: number }, { dataSources }) => {
      return dataSources.booksAPI.getBook(id);
    },
    books: async (parent, args, { dataSources }) => {
      return dataSources.booksAPI.getBooks();
    },
  },
  Mutation: {
    addBook: async (parent, { input }: { input: Book }, { dataSources }) => {
      return dataSources.booksAPI.postBook({ ...input });
    },
    updateBook: async (
      parent,
      { id, input }: { id: number; input: Book },
      { dataSources }
    ) => {
      return dataSources.booksAPI.putBook(id, { ...input });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

server.listen({ port }).then(({ url }) => {
  console.log(`Apollo Server started at ${url}`);
});
