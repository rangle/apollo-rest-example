import { ApolloServer, IResolvers } from "apollo-server";
import { typeDefs } from "./schema";
import BooksAPI from "./books-api";

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers: IResolvers = {
  Query: {
    // books: () => books,
    book: async (_source, { id }, { dataSources }) => {
      return dataSources.booksAPI.getBook(id);
    },
    books: async (_source, _params, { dataSources }) => {
      return dataSources.booksAPI.getBooks();
    },
  },
};

const dataSources = () => {
  return {
    booksAPI: new BooksAPI(),
    // personalizationAPI: new PersonalizationAPI(),
  };
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // dataSources,
  dataSources: () => {
    return {
      booksAPI: new BooksAPI(),
      // personalizationAPI: new PersonalizationAPI(),
    };
  },
  tracing: true,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
