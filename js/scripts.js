
var $_ = function (selector, node = document) {
  return node.querySelector(selector);
};

var $$_ = function (selector, node = document) {
  return node.querySelectorAll(selector);
};


var displayPokemons = function(array, output) {
  var elTemplateCard = $_('.card-template').content;  //card template
  output.innerHTML = '';


  var foundPakemonsFragment = document.createDocumentFragment()
  array.forEach(function (arrayItem) {
    var foundPokemonsItem = elTemplateCard.cloneNode(true);
    $_(`.js-pokemon-img`, foundPokemonsItem).src = arrayItem.img;
    $_(`.js-pokemon-name`, foundPokemonsItem).textContent = arrayItem.name;
    $_(`.js-pokemon-name`, foundPokemonsItem).textContent = arrayItem.name;
    
    for(var i = 0; i < arrayItem.type.length; i++) {
      var elSpan = document.createElement('span');
      elSpan.setAttribute('class', 'mr-3 font-weight-bold text-card-info');
      elSpan.textContent = arrayItem.type[i];
      $_('.js-spanbox', foundPokemonsItem).appendChild(elSpan);
    }
    foundPakemonsFragment.appendChild(foundPokemonsItem)
  });
  output.appendChild(foundPakemonsFragment)
}



var createElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.setAttribute('class', className);
  
  if (text) {
    element.textContent = text;
  }
  
  return element;
};
// Elementlarni tanlab oluvchi va yangi element tuzuvchi funksiyalar


var categories = [];


// DOM ga oid elementlar.

var elForm = $_('.js-from'); 
var elSearchInput = $_('.js-search-input');
var elTypeBtn = $_('.js-type-link');
var elCotigoryPokemonsList = $_('.js-catigories-list');
var elAllPokemonsList = $_('.js-pokemons-list');
var elModalWrapper = $_('.js-madal-wrapper');
var elTemplateCatigory = $_('.catigorya-template').content; //categories template

var elTemplateMadal = $_('.madal-template').content;  //modal template
// var elModal = $_('.load-more-btn');

displayPokemons(pokemons, elAllPokemonsList);
pokemons.forEach(function(pokemon) {
  pokemon.type.forEach(function(category){
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });
});

var elCotigoryFragment = document.createDocumentFragment()
categories.forEach (function (category) {
  var catigoryItem = elTemplateCatigory.cloneNode(true);
  
  $_(`.js-catigories-item`, catigoryItem).textContent = category;
  $_(`.js-catigories-item`, catigoryItem).dataset.datatype = category;
  
  elCotigoryFragment.appendChild(catigoryItem);
  
});
elCotigoryPokemonsList.appendChild(elCotigoryFragment)

elForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
});
elForm.addEventListener(`keyup`, function() {
  var inputValue = new RegExp(elSearchInput.value, `gi`);
  
  
  var foundPokemons = pokemons.filter(function (pokemon){
    return pokemon.name.match(inputValue);
  });
  
  displayPokemons(foundPokemons, elAllPokemonsList);
  
});


// <li class="pokemon-card__item bg-white position-relative" data-toggle="modal" data-target="#exampleModal">
// <img class="pokemon__img mx-auto d-block" src="img/001.png" alt="" width="160" height="160">
// <h4 class="text-center mt-3 mb-2">Bulbasaur</h3>
//   <p class="text-center my-0">Seed pokemon</p>
//   <div class="d-flex justify-content-center mt-1 align-items-center">
//     <span class="mr-3 font-weight-bold text-card-info">Poison</span>
//     <span class="ml-3 font-weight-bold text-card-succes">Grass</span>
//   </div>
//   <div class="d-flex justify-content-center mt-4">
//     <span class="mr-5 font-weight-light">Chlorophyl</span>
//     <span class="ml-5 font-weight-light">Overgrow</span>
//   </div>
//   <div class="pokemon__stat pokemon__stat--height">0.7m</div>
//   <div class="pokemon__stat pokemon__stat--width">6.9kg</div>

// </li>