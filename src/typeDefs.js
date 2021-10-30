const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    pokemon(id: Int): Pokemon
    pokemonByFilter(gen: Int, type: String): [NameAndIds]
    generations: [NameAndIds]
    types: [NameAndIds]
    boxSprites(id: Int): BoxSprites
  }

  type Sprites {
    front_default: String!
    front_shiny: String!
  }

  type BoxSprites {
    front_default: String!
  }

  type NameAndIds {
    id: Int!
    name: String!
  }

  type Pokemon {
    id: Int!
    name: String!
    sprites: Sprites!
    type: [Type!]!
    abilities: [Abilities!]
    stats: Stats!
    moves: [Moves]
    evolutionRequirement: [String]
    evolutionTrigger: String
    evolvesFrom: Pokemon
    evolvesTo: [Pokemon]
  }

  type Type {
    name: String!
  }

  type Abilities {
    id: Int!
    name: String!
    effect: String!
  }

  type Stats {
    hp: Int!
    attack: Int!
    defense: Int!
    special_attack: Int!
    special_defense: Int!
    speed: Int!
  }

  type Moves {
    id: Int!
    name: String!
    power: Int
    accuracy: Int
    pp: Int!
    type: String!
    damage_class: String
  }
`;

module.exports = { typeDefs };
