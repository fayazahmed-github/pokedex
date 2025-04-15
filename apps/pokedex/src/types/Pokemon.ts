export interface Pokemon {
    id: string;
    name: string;
    sprites: {
      front_default: string;
    };
    abilities: Array<{
      ability: {
        name: string;
      };
    }>;
  }
  
  export interface PokemonListResult {
    name: string;
    url: string;
  }