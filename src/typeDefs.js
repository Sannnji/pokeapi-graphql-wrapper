const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String!
    pokemonNamesAndIds(start: Int, end: Int): [NameAndIds]
    pokemon(id: Int): Pokemon
  }

  type Pokemon {
    id: Int!
    name: String!
    sprites: Sprites!
    type: [Type!]
  }

  type NameAndIds {
    id: Int!
    name: String!
  }

  type Type {
    name: String!
  }

  type Sprites {
    front_default: String!
    front_shiny: String!
  }
`;

module.exports = { typeDefs };
