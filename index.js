const gottaCatchEmAll = async() => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const data = await response.json();
  const pokemonList = data.results;
  console.log(pokemonList)
  const pokemonUl = document.querySelector(`ul`);
  
  pokemonList.forEach(pokemon => {
    const pokemonLi = document.createElement('li');
    pokemonLi.textContent = pokemon.name;
    
    pokemonLi.addEventListener('click', () => {
      const pokemonNumber = pokemonNumberFromUrl(pokemon.url);
      pokemonDetails(pokemonNumber);
    });
    
    pokemonUl.appendChild(pokemonLi);
  });
}

const pokemonNumberFromUrl = (url) => {
  const pokeSplit = url.split('/');
  return pokeSplit[pokeSplit.length - 2];
}

const pokemonDetails = async(pokemonNumber) => {
  const deetsDiv = document.querySelector(`div`);
  deetsDiv.innerHTML = '';
  
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
    const pokemon = await response.json();
    
    deetsDiv.innerHTML += `<p>Name: ${pokemon.name}</p>`;
    deetsDiv.innerHTML += `<p>Number: ${pokemon.number}</p>`;
    // This is where I want to have more stats show up //
  } catch (error) {
    console.log('Error fetching Pokemon details:', error);
  }
}

document.addEventListener('DOMContentLoaded', gottaCatchEmAll);
