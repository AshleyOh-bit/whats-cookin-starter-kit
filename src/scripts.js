import './styles.css';
import apiCalls from './apiCalls';


// Import classes
import  Recipe  from "./classes/Recipe";
import  Ingredient  from './classes/Ingredient';
import  RecipeRepository  from './classes/RecipeRepository';
import  recipeData  from './data/recipes.js';
import  ingredientsData  from './data/ingredients.js';

let instantiatedRecipes = [];

//We will be instantiating Recipes here from data
//event listener on window load for this function?


//let recipeRepo = new RecipeRepository(recipeData);
let recipeRepo = new RecipeRepository(instantiatedRecipes);

// DOM !!!
// Buttons
const allRecipesButton = document.getElementById("allRecipesButton");
const favoriteButton = document.getElementById("favoriteButton");
const toCookButton = document.getElementById("toCookButton");
const addToFavoriteButton = document.getElementById("addToFavoriteButton");
const addtoCookButton = document.getElementById("addtoCookButton");
// Submit Buttons
const filterNameIngInput = document.getElementById("filterNameIngInput");
const submitNameIng = document.getElementById("submitNameIng");
const submitTagsButton = document.getElementById("submitTagsButton");
const checkBoxes = document.querySelectorAll("input[type=checkbox]");
// Views
const tagsView = document.getElementById("tagsView");
const recipeDisplay = document.getElementById("recipeDisplay");
const favRecipesView = document.getElementById("favRecipesView");
const toCookRecipesView = document.getElementById("toCookRecipesView");
const currentRecipeView = document.getElementById("currentRecipeView");
const currentRecipeCard = document.getElementById("currentRecipeCard");

// Event Listeners
allRecipesButton.addEventListener('click', showAllRecipes);
submitNameIng.addEventListener('click', searchByNameIng);
submitTagsButton.addEventListener('click', searchByTags);
recipeDisplay.addEventListener("click", showCurrentRecipe);

window.addEventListener("load", function() {
  instantiateRecipes(recipeData)});

// favoriteButton.addEventListener('click', showFavoriteRecipes);
// addToFavoriteButton.addEventListener('click', );
// toCookButton.addEventListener('click', showRecipesToCook);
// addtoCookButton.addEventListener('click', );


// Functions
function preventDefault() {
  event.preventDefault()
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

// Show Recipes Function
// Change for iteration methods and be able to use for fav and to cook

function showRecipes(recipes) {
  // console.log(recipes);
  // recipeDisplay.innerHTML = "";
  // recipes.forEach(recipe => {
  //   recipeDisplay.innerHTML +=
  //
  //   `
  //   <p id=${recipe.id}>${recipe.name}</p>
  //   <img id=${recipe.id} src=${recipe.image}>
  //   `
  //
  // })

  for (var i = 0; i < recipes.length; i++) {
    //recipes[i];

    // console.log(recipes[i]);
    let recipeCard = document.createElement("div");
    recipeCard.innerHTML =
    `
    <p id=${recipes[i].id}>${recipes[i].name}</p>
    <img id=${recipes[i].id} src=${recipes[i].image}>
    `
    recipeDisplay.appendChild(recipeCard)
  }
}

function showAllRecipes() {
  hide(toCookRecipesView);
  hide(favRecipesView);
  hide(currentRecipeView);
  preventDefault();
  show(recipeDisplay);

  showRecipes(recipeRepo.recipes);
}

function searchByNameIng() {
  hide(toCookRecipesView);
  hide(favRecipesView);
  hide(currentRecipeView);
  preventDefault();
  show(recipeDisplay);
  console.log(filterNameIngInput.value);
  // let test1 = [];
  const test2 = recipeRepo.filterRecipesByName(filterNameIngInput.value);
  console.log(test2);
  showRecipes(test2);
  // we neew to add extra function to clean the screan for the next input that the user write
}

// filterNameIngInput.value"
// Will take the value from the user tags selection
//That value will pass as an "Argument" through:
// recipeRepository.findIngredientNames(filterNameIngInput.value)
// Is gonna iterate and filter all the recipes repository info and will return a new array based the "User conditions".
// That new array will be the ARGUMENT for  "showRecipes();"

function searchByTags() {
  hide(toCookRecipesView);
  hide(favRecipesView);
  hide(currentRecipeView);
  preventDefault();
  show(recipeDisplay);

  let checkBoxMatches = [];
  checkBoxes.forEach(checkBox => {
    if(checkBox.checked) {
      checkBoxMatches.push(checkBox.value)
    }
  })

  const tagMatches = recipeRepo.filterRecipesTags(checkBoxMatches);

  showRecipes(tagMatches)
}

function displayCurrentRecipe(currentRecipe) {
    currentRecipeView.innerHTML = "";
    //console.log("displayCurrentRecipe ")
    console.log(currentRecipe)
      currentRecipeView.innerHTML =
          `<div class="current-recipe-card" id="currentRecipeCard">
          <section class="current-recipe-name">
            <h3>${currentRecipe.name}</h3>
          </section>
          <section class="current-recipe-add-to-fav">
            <button class="add-favorite-button" id="addToFavoriteButton">Favorite</button>
            <div class="current-recipe-add-to-cook">
              <button class="add-to-cook-button" id="addtoCookButton">Add to Weekly Meals</button>
            </div>
          </section>
          <section class="current-recipe-img">
            <div class="current-recipe-ing">
              <ul>
                <li>${currentRecipe.findIngredientNames(ingredientsData)}</li>
              </ul>
            </div>
            <div class="food-image">
              <img src=${currentRecipe.image}>
            </div>
          </section>
          <section class="current-recipe-text">
            <div class="current-recipe-inst">
              <ol>
                <li>${currentRecipe.findIngredientNames(ingredientsData)}</li>
              </ol>
            </div>
            <div class="current-recipe-tags">
              <ul>
                <li>${currentRecipe.tags}</li>
              </ul>
            </div>
          </section>
        </div>`

    // currentRecipeView.innerHTML = currentRecipeHTML;
    //currentRecipeView.appendChild(currentRecipeView)
};

function instantiateRecipes(recipeData) {
  recipeData.map(recipe => {
    recipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags)
    recipe.createFullIngredients(ingredientsData)
    //console.log(recipe)
    return instantiatedRecipes.push(recipe)
  })
}

function showCurrentRecipe() {
  hide(recipeDisplay);
  hide(toCookRecipesView);
  hide(favRecipesView);
  show(currentRecipeView);
  // getTarget();
// I need to incorporate and event.target to tell the browser in the card that we make click get the value of that card
 // if (evet.target.id === recipeRepo.recipes.id)
 // console.log(evet.target.id  )







  // recipeRepo.recipes.find(recipe => {
  //   console.log(event.target)
  //   // event target closest for class
  //   // event target.id also?
  //   match = event.target.closest(`${recipe.name}`)
  //
  //   return match
  //   }
  // })
  // recipeRepo.recipes.find(recipe => {
  //   console.log(event.target.id)
  //   console.log(recipe.id)
  //   if (event.target.id === parseInt(recipe.id)) {
  //     match = recipe;
  //     console.log(match)
  //   }
  // }
  // displayCurrentRecipe()
};

function getTarget(events) {
  let events = event.target.id
  console.log(target)
  showCurrentRecipe()
}

// function showFavoriteRecipes() {
//   show(favRecipesView);
//   hide(toCookRecipesView);
// }
//
// function showRecipesToCook() {
//   show(toCookRecipesView);
//   hide(favRecipesView);
// }




// window.onload = showRecipes(recipeRepo.recipes);
//recipe.createFullIngredients()

console.log('Hello world');
