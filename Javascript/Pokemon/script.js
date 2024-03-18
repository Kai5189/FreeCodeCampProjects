let searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonNameText = document.getElementById('pokemon-name');
const pokemonIdText = document.getElementById('pokemon-id');
const weightText = document.getElementById('weight');
const heightText = document.getElementById('height');
const typesText = document.getElementById('types');
const hpText = document.getElementById('hp');
const attackText = document.getElementById('attack');
const defenseText = document.getElementById('defense');
const specialAttackText = document.getElementById('special-attack');
const specialDefenseText = document.getElementById('special-defense');
const speedText = document.getElementById('speed');

const myPoke = document.getElementById('my-poke')
const tableRows = document.querySelectorAll("tr")
const toggleElements = document.querySelectorAll('.toggle')


const search = () => {
  
  const character = searchInput.value.toLowerCase();
  
    
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${character}`)
      .then((res) => res.json())
      .then((data) => {
        
        const [hp, attack, defense, specialAttack, specialDefense, speed] = data.stats.map(item => item.base_stat)
        console.log(data)
        const pokemonName = data.name.toUpperCase();
        const pokemonId = data.id;
        const types = data.types.map(e => e.type.name);
        console.log(types)
        const weight = data.weight;
        const height = data.height;
        const source = data.sprites.front_default;
        pokemonNameText.innerText = pokemonName;
        pokemonIdText.innerText = '#' + pokemonId;
        weightText.innerText = weight;
        heightText.innerText = height;
        typesText.innerHTML = ''
        types.forEach(e => typesText.innerHTML += `<div>${e.toUpperCase()}</div>`);

        hpText.innerText = hp;
        attackText.innerText = attack;
        defenseText.innerText = defense;
        specialAttackText.innerText = specialAttack;
        specialDefenseText.innerText = specialDefense;
        speedText.innerText = speed;
        
        myPoke.innerHTML = `<img id="sprite" src="${source}"/>`

       
        tableRows.forEach((item) => {
   item.style.display = 'table-row'
   })
        
        toggleElements.forEach((item) => {
   item.style.visibility = 'visible'
   })
  

    }).catch((error) => {
      alert("Pokemon Not Found");
    }
    )   
}

searchButton.addEventListener('click', search);