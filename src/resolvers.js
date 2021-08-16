const resolvers = {
  Query: {
    hello: () => "Hello World",

    pokemonNamesAndIds: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getpokemonNamesAndIds(args.start, args.end);
    },

    pokemon: (parent, args, { dataSources }) => {
      return args.id;
    },
    icons: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeIcon(args.id);
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
    abilities: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeAbilities(parent);
    },
    stats: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeBaseStats(parent);
    },
    moves: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMoveId(parent);
    },
  },

  Type: {
    name: (parent, args, { dataSources }) => parent,
  },

  Abilities: {
    name: (parent, args, { dataSources }) => parent,
  },

  Moves: {
    id: (parent, arg, { dataSources }) => parent,

    name: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMoveName(parent);
    },
  },

  //   Icons: {
  //     front_default: (parent, args, { dataSources }) => {
  //       return dataSources.pokeApi.getPokeIcon(parent);
  //     },
  //     front_female: (parent, args, { dataSources }) => {
  //       return dataSources.pokeApi.getPokeIcon(parent);
  //     },
  //   },
};

module.exports = { resolvers };
