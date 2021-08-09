const { RESTDataSource } = require("apollo-datasource-rest");

const { parseUrl } = require("../../utils/parseUrl");

class PokeApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://pokeapi.co/api/v2/";
  }

  async getpokemonNamesAndIds(start, end) {
    const response = await this.get(`pokemon?offset=${start}&limit=${end}`);

    const namesAndIds = response.results.map((pokemon) => {
      const id = parseUrl(pokemon.url);
      const name = pokemon.name;
      return {
        id,
        name,
      };
    });

    return namesAndIds;
  }

  async getPokeId(id) {
    const response = await this.get(`pokemon/${id}`);
    return response.id;
  }

  async getPokeName(id) {
    const response = await this.get(`pokemon/${id}`);
    return response.name;
  }

  async getPokeSprites(id) {
    const response = await this.get(`pokemon/${id}`);
    return response.sprites;
  }

  async getPokeTypeId(id) {
    const response = await this.get(`pokemon/${id}`);
    const types = response.types;
    const typeIds = types.map((type) => type.type.name);

    return typeIds
  }
}

module.exports = { PokeApi };
