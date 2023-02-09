const searchInput = document.querySelector('.searchPokemon input');
const pokemonList = document.querySelector('.pokemonList');
const loading = document.querySelector('.loader');

let allPokemon = [];
let arrayEnd = [];

const types = {
    grass: '#78c850',
    ground: '#E2BF65',
    dragon: '#6F35FC',
    fire: '#F58271',
    electric: '#F7D02C',
    fairy: '#D685AD',
    poison: '#966DA3',
    bug: '#B3F594',
    water: '#6390F0',
    normal: '#D9D5D8',
    psychic: '#F95587',
    flying: '#A98FF3',
    fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};


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

            // Fetch informations about a specific pokemon
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
                .then(reponse => reponse.json())
                .then((pokeData) => {
                    // console.log(pokeData);
                    // catch FR name and add into object
                    fullPokemonObject.name = pokeData.names[4].name;
                    allPokemon.push(fullPokemonObject);

                    if (allPokemon.length === 300) {
                        // console.log(allPokemon);
                        // Sort array by id
                        arrayEnd = allPokemon.sort((a, b) => {
                            return a.id - b.id;
                        }).slice(0, 21);

                        // Callback arrayEnd into function
                        createCard(arrayEnd);
                        // Stop loading animation when list is fetch
                        loading.style.display = "none";
                    }
                })
        })
}

// Create card and display it
function createCard(arr) {
    for (let i = 0; i < arr.length; i++) {
        const card = document.createElement('li');
        let couleur = types[arr[i].type];
        card.style.background = couleur;
        const txtCard = document.createElement('h5');
        txtCard.innerText = arr[i].name;
        const typeCard = document.createElement('p');
        typeCard.innerText = `Type ${arr[i].type}`;
        const imgCard = document.createElement('img');
        imgCard.src = arr[i].pic;

        card.appendChild(imgCard);
        card.appendChild(txtCard);
        card.appendChild(typeCard);

        pokemonList.appendChild(card);
    }

}

// Infinite scroll
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // scrollTop = scroll since top
    // scrollHeight = total scroll
    // clientHeight = height of windows, visible part.

    if (clientHeight + scrollTop >= scrollHeight - 20) {
        addPoke(6);
    }
})

let index = 21;

function addPoke(nb) {
    if (index > 300) {
        return;
    }

    const arrToAdd = allPokemon.slice(index, index + nb);
    console.log(index, index + nb);
    createCard(arrToAdd);
    index += nb;
}

// Search
searchInput.addEventListener('keyup', search);

function search() {
    if (index < 300) {
        addPoke(299);
    }

    let filter, allLi, titleValue, allTitles;
    filter = searchInput.value.toUpperCase();
    allLi = document.querySelectorAll('li');
    allTitles = document.querySelectorAll('li > h5');

    for (i = 0; i < allLi.length; i++) {
        titleValue = allTitles[i].innerText;

        if (titleValue.toUpperCase().indexOf(filter) > -1) {
            allLi[i].style.display = "flex";
        } else {
            allLi[i].style.display = "none";
        }
    }
}

// Input animation
searchInput.addEventListener('input', function (event) {
    if (event.target.value !== "") {
        event.target.parentNode.classList.add('active-input');
    } else if (event.target.value === "") {
        event.target.parentNode.classList.remove('active-input');
    }
})