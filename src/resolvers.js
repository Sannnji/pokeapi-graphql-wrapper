const resolvers = {
  Query: {
    hello: () => "Hello World",

    pokemonNamesAndIds: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getpokemonNamesAndIds(args.start, args.end);
    },

    pokemon: (parent, args, { dataSources }) => {
      return args.id;
    },
  },

  Pokemon: {
    id: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeId(parent);
    },
    name: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeName(parent);
    },
    sprites: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeSprites(parent);
    },
    type: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeTypeId(parent);
    },
  },

  Type: {
    name: (parent, arrgs, { dataSources }) => parent,
  },
};

module.exports = { resolvers };
