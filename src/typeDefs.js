const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String!
    pokemonNamesAndIds(start: Int, end: Int): [NameAndIds]
    pokemon(id: Int): Pokemon
    icons(id: Int): Icons
  }

  type Sprites {
    front_default: String!
    front_shiny: String!
  }

  type Icons {
    front_default: String!
    front_female: String!
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
    abilities: [Abilities!]!
    stats: Stats
  }

  type Type {
    name: String!
  }

  type Abilities {
    name: String!
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
    name: String!
    power: Int!
    accuracy: Int!
    pp: Int!
    type: String!
    damageClass: String
  }

`;

module.exports = { typeDefs };
