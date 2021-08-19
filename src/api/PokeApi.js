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

  async getPokeIds(start, end) {
    const response = await this.get(`pokemon?offset=${start}&limit=${end}`);

    const ids = response.results.map((pokemon) => {
      const id = parseUrl(pokemon.url);

      return {
        id,
      };
    });

    return ids;
  }

  async getPokeSprites(id) {
    const response = await this.get(`pokemon/${id}`);
    return response.sprites;
  }

  async getBoxSprites(id) {
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

  async getPokeBaseStats(id) {
    const response = await this.get(`pokemon/${id}`);
    const hp = await this.getHitPointStat(id);
    const attack = await this.getAttackStat(id);
    const defense = await this.getDefenseStat(id);
    const special_attack = await this.getSpecial_AttackStat(id);
    const special_defense = await this.getSpecial_DefenseStat(id);
    const speed = await this.getSpeedStat(id);
    return {
      hp: parseInt(hp),
      attack: parseInt(attack),
      defense: parseInt(defense),
      special_attack: parseInt(special_attack),
      special_defense: parseInt(special_defense),
      speed: parseInt(speed),
    };
  }

  async getHitPointStat(id) {
    const response = await this.get(`pokemon/${id}`);
    const stats = response.stats;
    const hp = stats.find((stat) => stat.stat.name === "hp");
    return hp.base_stat;
  }

  async getAttackStat(id) {
    const response = await this.get(`pokemon/${id}`);
    const stats = response.stats;
    const attack = stats.find((stat) => stat.stat.name === "attack");
    return attack.base_stat;
  }

  async getDefenseStat(id) {
    const response = await this.get(`pokemon/${id}`);
    const stats = response.stats;
    const defense = stats.find((stat) => stat.stat.name === "defense");
    return defense.base_stat;
  }

  async getSpecial_AttackStat(id) {
    const response = await this.get(`pokemon/${id}`);
    const stats = response.stats;
    const spAttack = stats.find((stat) => stat.stat.name === "special-attack");
    return spAttack.base_stat;
  }

  async getSpecial_DefenseStat(id) {
    const response = await this.get(`pokemon/${id}`);
    const stats = response.stats;
    const spDefense = stats.find(
      (stat) => stat.stat.name === "special-defense"
    );
    return spDefense.base_stat;
  }

  async getSpeedStat(id) {
    const response = await this.get(`pokemon/${id}`);
    const stats = response.stats;
    const speed = stats.find((stat) => stat.stat.name === "speed");
    return speed.base_stat;
  }

  async getPokeMoveId(id) {
    const response = await this.get(`pokemon/${id}`);
    const move = response.moves;
    const moveId = move.map((move) => {
      const id = parseUrl(move.move.url);
      return id;
    });
    return moveId;
  }

  async getPokeMoveName(lvlupMoveId) {
    const response = await this.get(`move/${lvlupMoveId}`);
    return response.name;
  }

  async getPokeLevelUpMoveId(id) {
    const response = await this.get(`pokemon/${id}`);
    const move = response.moves;
    const lvlupMoveId = move.map((move) => {
      const id = parseUrl(move.move.url);
      const version = move.version_group_details;

      const methodName = version.find(
        (data) => data.move_learn_method.name === "level-up"
      );

      return methodName ? id : null;
    });
    return lvlupMoveId ? lvlupMoveId : null;
  }

  async getPokeMovePower(lvlupMoveId) {
    const response = await this.get(`move/${lvlupMoveId}`);
    const power = response.power;
    return power ? power : null;
  }

  async getPokeMoveAccuracy(lvlupMoveId) {
    const response = await this.get(`move/${lvlupMoveId}`);

    return response.accuracy;
  }
  async getPokeMovePP(lvlupMoveId) {
    const response = await this.get(`move/${lvlupMoveId}`);

    return response.pp;
  }
  async getPokeMoveType(lvlupMoveId) {
    const response = await this.get(`move/${lvlupMoveId}`);
    const moveType = response.type;
    const name = moveType.name;
    return name;
  }

  async getPokeMoveDamageClass(lvlupMoveId) {
    const response = await this.get(`move/${lvlupMoveId}`);
    const damageClass = response.damage_class;

    return damageClass.name;
  }
}

module.exports = { PokeApi };
