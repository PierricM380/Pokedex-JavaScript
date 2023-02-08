const searchInput = document.querySelector('.searchPokemon input');

let allPokemon = [];
let arrayEnd = [];

// Fetch base of Pokemon with https://pokeapi.co/api/v2/pokemon/
function fetchBasePokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=300")
        .then(response => response.json())
        .then((allPoke) => {
            // console.log(allPoke);
            // Fetch all Pokemon
            allPoke.results.forEach((pokemon) => {
                fetchCompletePokemon(pokemon);
            })

        })
}

fetchBasePokemon();

function fetchCompletePokemon(pokemon) {
    let fullPokemonObject = {};
    let url = pokemon.url;
    let pokemonName = pokemon.name;

    fetch(url)
        .then(reponse => reponse.json())
        .then((pokeData) => {
            // console.log(pokeData);
            // Pokemon object construction 
            fullPokemonObject.pic = pokeData.sprites.front_default;
            fullPokemonObject.type = pokeData.types[0].type.name;
            fullPokemonObject.id = pokeData.id;

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
                .then(reponse => reponse.json())
                .then((pokeData) => {
                    // console.log(pokeData);
                    // catch FR name and add into object
                    fullPokemonObject.name = pokeData.names[4].name;
                    allPokemon.push(fullPokemonObject);

                    if (allPokemon.length === 300) {
                        console.log(allPokemon);
                    }
                })
        })
}

// Input animation
searchInput.addEventListener('input', function (event) {
    if (event.target.value !== "") {
        event.target.parentNode.classList.add('active-input');
    } else if (event.target.value === "") {
        event.target.parentNode.classList.remove('active-input');
    }
})