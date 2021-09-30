const resolvers = {
  Query: {
    hello: () => "Hello World",

    pokemonNamesAndIds: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getpokemonNamesAndIds(args.start, args.end);
    },

    pokemon: (parent, args, { dataSources }) => {
      return args.id;
    },
    boxSprites: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getBoxSprites(args.id);
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
      return dataSources.pokeApi.getPokeAbilityId(parent);
    },
    stats: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeBaseStats(parent);
    },
    moves: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeLevelUpMoveId(parent);
    },
  },

  Type: {
    name: (parent, args, { dataSources }) => parent,
  },

  Abilities: {
    id: (parent, args, { dataSources }) => parent,
    name: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getAbilityName(parent);
    },
    effect: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getAbilityEffect(parent);
    },
  },

  Moves: {
    id: (parent, arg, { dataSources }) => parent,
    name: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMoveName(parent);
    },
    power: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMovePower(parent);
    },
    pp: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMovePP(parent);
    },
    accuracy: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMoveAccuracy(parent);
    },
    type: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMoveType(parent);
    },
    damage_class: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMoveDamageClass(parent);
    },
  },
};

module.exports = { resolvers };
