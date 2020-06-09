import { ApolloServer, IResolvers } from "apollo-server";
import { typeDefs } from "./schema";
import BooksAPI from "./books-api";

/** Port for Apollo Server */
const port = 4000;

const dataSources = () => ({
  booksAPI: new BooksAPI(),
});

type DataSources = ReturnType<typeof dataSources>;

const resolvers: IResolvers<any, { dataSources: DataSources }> = {
  Query: {
    book: async (_source, { id }, { dataSources }) => {
      return dataSources.booksAPI.getBook(id);
    },
    books: async (_source, _params, { dataSources }) => {
      return dataSources.booksAPI.getBooks();
    },
  },
  Mutation: {
    addBook: async (_source, { input }, { dataSources }) => {
      return dataSources.booksAPI.postBook({ ...input });
    },
    updateBook: async (_source, { id, input }, { dataSources }) => {
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
