const pokemonList = []; 

const gottaCatchEmAll = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    pokemonList.push(...data.results); 
    console.log(pokemonList);
    render(); 
  } catch (error) {
    console.log('Error: The Pokemon Caught YOU:', error);
  }
};

const displayPokemonList = () => {
  const pokemonUl = document.querySelector('ul');
  pokemonUl.innerHTML = ''; 
  for (let i = 0; i < pokemonList.length; i++) {
    const pokemon = pokemonList[i];
    const pokemonLi = document.createElement('li');
    pokemonLi.innerText = pokemon.name;
    
    pokemonLi.addEventListener('click', () => {
      const pokemonNumber = pokemonNumberFromUrl(pokemon.url);
      pokemonDetails(pokemonNumber);
      pokemonUl.innerHTML = ''; 
    });
    
    
    pokemonUl.appendChild(pokemonLi);
  }
};

const render = () => {
  displayPokemonList();
};

const pokemonNumberFromUrl = (url) => {
  const pokeSplit = url.split('/');
  return pokeSplit[pokeSplit.length - 2];
};

const pokemonDetails = async (pokemonNumber) => {
  const deetsDiv = document.querySelector('div');
  deetsDiv.innerHTML = '';

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
    const pokemon = await response.json();

    deetsDiv.innerHTML += `<p>Name: ${pokemon.name}</p>`;
    deetsDiv.innerHTML += `<p>Base Experience ${pokemon.base_experience}</p>`;
    deetsDiv.innerHTML += `<p>Height: ${pokemon.height}</p>`;
    deetsDiv.innerHTML += `<p>Weight: ${pokemon.weight}</p>`;
    deetsDiv.innerHTML += `<p>1st Ability: ${pokemon.abilities[0].ability.name}</p>`;
    deetsDiv.innerHTML += `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">`;
    deetsDiv.innerHTML += `<img src="${pokemon.sprites.back_default}" alt="${pokemon.name}">`;

    const backButton = document.createElement('button');
    backButton.innerText = 'Back';
    backButton.addEventListener('click', () => {
      deetsDiv.innerHTML = '';
      render();
    });

    deetsDiv.appendChild(document.createElement('br'));
    deetsDiv.appendChild(backButton);
  } catch (error) {
    console.log('Error: The Pokemon Caught YOU:', error);
  }
};

document.addEventListener('DOMContentLoaded', gottaCatchEmAll);
