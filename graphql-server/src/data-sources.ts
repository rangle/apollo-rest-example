import BooksAPI from "./books-api";

/**
 * All available data sources, e.g. from APIs, DBs etc.
 *
 * _Data sources are classes that encapsulate fetching data from a particular service_
 * https://www.apollographql.com/docs/apollo-server/data/data-sources/
 */
export const dataSources = () => ({
  booksAPI: new BooksAPI(), // just one for now
});

export type DataSources = ReturnType<typeof dataSources>;
