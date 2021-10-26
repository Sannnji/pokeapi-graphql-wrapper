const { RESTDataSource } = require("apollo-datasource-rest");

const { parseUrl } = require("../../utils/parseUrl");

class PokeApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://pokeapi.co/api/v2/";
  }

  async getGenerations() {
    const response = await this.get("generation");

    const generations = response.results;
    return generations.map((gen) => {
      const id = parseUrl(gen.url);
      const name = gen.name.replace("generation", "gen");

      return {
        id,
        name,
      };
    });
  }

  async getTypes() {
    const response = await this.get("type");

    const typeArr = response.results.map((type) => {
      const id = parseUrl(type.url);
      const name = type.name;

      return {
        id,
        name,
      };
    });

    typeArr.splice(18, 2);

    return typeArr;
  }

  // POKE by filter

  async getPokemonByFilter(gen, type) {
    if (gen && type) {
      const pokeByGen = await this.getPokemonByGeneration(gen);
      const PokeByType = await this.getPokemonByType(type);

      function filterIt(id) {
        return PokeByType.find((pokemon) => {
          return pokemon.id == id;
        });
      }

      const filteredArr = pokeByGen.filter((pokemon) => filterIt(pokemon.id));

      // const test = await Promise.all(
      //   pokeByGen.map(async (pokemon) => {
      //     const poke = await this.getPokemonById(pokemon.id);
      //     const pokeTypes = poke.types.map((type) => type.type.name);
      //     return {
      //       id: poke.id,
      //       name: poke.name,
      //       type: pokeTypes,
      //     };
      //   })
      // );
      // const filtered = test.filter((pokemon) => pokemon.type.includes(type));

      return filteredArr;
    }

    if (gen) return this.getPokemonByGeneration(gen);
    if (type) return this.getPokemonByType(type);
  }

  async getPokemonByGeneration(gen) {
    const response = await this.get(`generation/${gen}`);

    const pokemon = response.pokemon_species.map((pokemon) => {
      const id = parseUrl(pokemon.url);
      const name = pokemon.name;

      return {
        id,
        name,
      };
    });
    const sortedArr = pokemon.sort((a, b) => {
      return a.id - b.id;
    });

    return sortedArr;
  }

  async getPokemonByType(type) {
    const response = await this.get(`type/${type}`);

    const pokemon = response.pokemon.map((pokemon) => {
      const id = parseUrl(pokemon.pokemon.url);
      const name = pokemon.pokemon.name;

      return {
        id,
        name,
      };
    });

    const sortedArr = pokemon.sort((a, b) => {
      return a.id - b.id;
    });

    return sortedArr;
  }

  async getPokemonById(id) {
    return await this.get(`pokemon/${id}`);
  }

  // POKE INFO

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

  // POKE ABILITY

  async getPokeAbilityId(id) {
    const response = await this.get(`pokemon/${id}`);
    const abilities = response.abilities;
    const abilityId = abilities.map((ability) => {
      const id = parseUrl(ability.ability.url);
      return id;
    });
    return abilityId;
  }

  async getPokeAbilityName(abilityId) {
    const response = await this.get(`ability/${abilityId}`);
    const abilityName = response.name;
    return abilityName;
  }

  async getPokeAbilityEffect(abilityId) {
    const response = await this.get(`ability/${abilityId}`);
    const engEffect = response.effect_entries.find(
      (entry) => entry.language.name === "en"
    );
    const abilityEffect = engEffect.effect;
    return abilityEffect;
  }

  // POKE STATS

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

  // POKE MOVES

  async getPokeMoveId(id) {
    const response = await this.get(`pokemon/${id}`);
    const move = response.moves;
    const moveId = move.map((move) => {
      const id = parseUrl(move.move.url);
      return id;
    });
    return moveId;
  }

  async getPokeLevelUpMoveId(id) {
    const response = await this.get(`pokemon/${id}`);
    const move = response.moves;
    const lvlupMoveId = move.map((move) => {
      const id = parseUrl(move.move.url);
      const version = move.version_group_details;

      const levelMethod = version.find(
        (data) => data.move_learn_method.name === "level-up"
      );

      return levelMethod ? id : null;
    });
    return lvlupMoveId ? lvlupMoveId : null;
  }

  async getPokeMoveName(lvlupMoveId) {
    const response = await this.get(`move/${lvlupMoveId}`);
    return response.name;
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

  // POKE EVOLUTION

  async getPokeEvolvesFrom(id) {
    // get pokemon species to access evolution details
    const species = await this.get(`pokemon-species/${id}`);

    // check if pokemon has prev evolution
    if (species.evolves_from_species === null) {
      return null;
    } else {
      // if so get evolution chain
      const evolutionChain = await this.get(
        `evolution-chain/${parseUrl(species.evolution_chain.url)}`
      );

      // get prev evolutions id
      const evolvesFrom = await this.getEvolvesFromPokeId(
        // selected pokemons id
        id,
        // evolution chain OBJ
        evolutionChain
      );

      return evolvesFrom;
    }
  }

  async getEvolvesFromPokeId(currentPoke, evolutionChainOBJ) {
    let pokeId;

    const SecondEvolId = evolutionChainOBJ.chain.evolves_to.map((prop) =>
      parseUrl(prop.species.url)
    );

    if (SecondEvolId == currentPoke) {
      pokeId = parseUrl(evolutionChainOBJ.chain.species.url);
    } else {
      pokeId = SecondEvolId;
    }

    return pokeId;
  }

  async getPokeEvolvesTo(id) {
    // get pokemon species to access evolution details
    const species = await this.get(`pokemon-species/${id}`);

    // get pokemon evolution chain
    const evolutionChain = await this.get(
      `evolution-chain/${parseUrl(species.evolution_chain.url)}`
    );

    // get next evolutions pokeID
    const evolvesTo = await this.getEvolvesToPokeId(id, evolutionChain);

    return evolvesTo;
  }

  async getEvolvesToPokeId(currentPoke, evolutionChainOBJ) {
    let pokeId;

    // get evolutions Ids
    const FirstEvolId = parseUrl(evolutionChainOBJ.chain.species.url);
    const SecondEvolId = evolutionChainOBJ.chain.evolves_to.map((prop) =>
      parseUrl(prop.species.url)
    );
    const ThirdEvolId = evolutionChainOBJ.chain.evolves_to.map((prop) =>
      prop.evolves_to.map((prop) => parseUrl(prop.species.url))
    )[0];

    console.log(ThirdEvolId);

    // if current pokemon is the first evolution
    if (currentPoke == FirstEvolId) {
      // return next evolutions Id
      pokeId = SecondEvolId;
      // if current pokemon is the second evolution
    } else if (currentPoke.toString() == SecondEvolId[0]) {
      // return next evolutions Id
      pokeId = ThirdEvolId;
    } else return null;

    return [pokeId];
  }
}

module.exports = { PokeApi };
