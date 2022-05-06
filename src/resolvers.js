const resolvers = {
  Query: {
    pokemon: (parent, args, { dataSources }) => {
      return args.id;
    },

    pokemonByFilter: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokemonByFilter(args.gen, args.type);
    },

    generations: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getGenerations();
    },

    types: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getTypes();
    },

    boxSprites: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getBoxSprites(args.id);
    },

    versionGroups: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getVersionGroups();
    },
  },

  Pokemon: {
    id: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeId(parent);
    },
    name: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeName(parent);
    },
    flavorText: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeFlavorText(parent);
    },
    genus: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeGenus(parent);
    },
    height: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeHeight(parent);
    },
    sprites: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeSprites(parent);
    },
    type: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeType(parent);
    },
    abilities: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeAbilityId(parent);
    },
    stats: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeBaseStats(parent);
    },
    moves: async (parent, args, { dataSources }) => {
      const moveIds = await dataSources.pokeApi.getPokeMoveId(parent);
      const pokemonAndMoveIds = moveIds.map((moveId) => {
        return {
          pokemonId: parent,
          moveId: moveId,
          game: args.game,
        };
      });

      return pokemonAndMoveIds;
    },
    evolutionRequirement: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getEvolutionRequirment(parent);
    },
    evolutionTrigger: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getEvolutionTrigger(parent);
    },
    evolvesFrom: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeEvolvesFrom(parent);
    },
    evolvesTo: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeEvolvesTo(parent);
    },
  },

  Type: {
    name: (parent, args, { dataSources }) => parent,
  },

  Abilities: {
    id: (parent, args, { dataSources }) => parent,
    name: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeAbilityName(parent);
    },
    effect: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeAbilityEffect(parent);
    },
  },

  Moves: {
    id: (parent, arg, { dataSources }) => parent.moveId,
    name: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMoveName(parent.moveId);
    },
    power: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMovePower(parent.moveId);
    },
    pp: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMovePP(parent.moveId);
    },
    accuracy: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMoveAccuracy(parent.moveId);
    },
    type: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMoveType(parent.moveId);
    },
    damage_class: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMoveDamageClass(parent.moveId);
    },
    learnMethods: (parent, args, { dataSources }) => {
      return dataSources.pokeApi.getPokeMoveLearnMethodByGame(
        parent.pokemonId,
        parent.moveId,
        parent.game
      );
    },
  },

  VersionGroup: {
    id: (parent, args, { dataSources }) => parent.id,
    name: (parent, args, { dataSources }) => parent.name,
  },
};

module.exports = { resolvers };
