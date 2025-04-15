export const fetchPokemonList = async (page = 1) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 100}&limit=100`
    );
    return response.json();
};

export const fetchPokemonDetails = async (id: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.json();
};