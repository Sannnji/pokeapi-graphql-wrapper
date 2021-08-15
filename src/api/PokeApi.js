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

  async getPokeSprites(id) {
    const response = await this.get(`pokemon/${id}`);
    return response.sprites;
  }

  async getPokeIcon(id) {
    const response = await this.get(`pokemon/${id}`);
    const version = response.sprites.versions["generation-viii"];
    const icons = version.icons;
    return icons;
  }

  async getPokeId(id) {
    const response = await this.get(`pokemon/${id}`);
    return response.id;
  }

  async getPokeName(id) {
    const response = await this.get(`pokemon/${id}`);
    return response.name;
  }

  async getPokeTypeId(id) {
    const response = await this.get(`pokemon/${id}`);
    const types = response.types;
    const typeName = types.map((type) => type.type.name);
    return typeName;
  }

  async getPokeAbilities(id) {
    const response = await this.get(`pokemon/${id}`);
    const abilities = response.abilities;
    const abilityNames = abilities.map((ability) => ability.ability.name);
    return abilityNames;
  }

  async getAttackStat(id) {
    const response = await this.get(`pokemon/${id}`);
    const stat = response.stat;
    const attack = stat.map((stat) => stat.stat.name === "attack");
    return attack.base_stat;
  }

  async getDefenseStat(id) {
    const response = await this.get(`pokemon/${id}`);
    const stat = response.stat;
    const Defense = stat.map((stat) => stat.stat.name === "defense");
    return Defense.base_stat;
  }
}

module.exports = { PokeApi };
