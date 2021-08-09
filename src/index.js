const { ApolloServer } = require("apollo-server");

const { PokeApi } = require("./api/PokeApi");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      pokeApi: new PokeApi(),
    };
  },
});

server.listen({ port: process.env.PORT || 9000 }).then(({ url }) => {
  console.log(`
      🚀  Server is ready at ${url}
      📭  Query at https://studio.apollographql.com/dev
    `);
});
