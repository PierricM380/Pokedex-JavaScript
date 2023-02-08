const searchInput = document.querySelector('.searchPokemon input');

// Input animation
searchInput.addEventListener('input', function(event) {
    if(event.target.value !== "") {
        event.target.parentNode.classList.add('active-input');
    } else if(event.target.value === "") {
        event.target.parentNode.classList.remove('active-input');
    }
})