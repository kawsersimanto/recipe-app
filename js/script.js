const form = document.querySelector("form");
const meals = document.querySelector(".meals");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("input");
  getMealsBySearch(input.value);
});

getRandomMeals();

async function getRandomMeals() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const data = await response.json();
  const randomMeal = data.meals[0];
  addMeal(randomMeal, true);
}

async function getMealsBySearch(term) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  const data = await response.json();
  const meal = data.meals[0];
  addMeal(meal);
}

function addMeal(randomMeal, random = false) {
  const meal = document.createElement("div");
  meals.innerHTML = "";
  meal.className = "meal mt-4";
  meal.innerHTML = `
  <div class="meal border shadow">
  ${random ? `<span class="random">Random Recipe</span>` : ""}
    
    <div class="meal-header">
      <img
        class="img-fluid"
        src="${randomMeal.strMealThumb}"
        alt="${randomMeal.strMeal}"
      />
    </div>
    <div
      class="meal-body d-flex align-items-center text-start justify-content-between py-3 px-2"
    >
      <h5 class="mb-0">${randomMeal.strMeal}</h5>
      <button class="bg-transparent border-0 fav-btn">
        <i class="fas fa-heart love-btn"></i>
      </button>
    </div>
  </div>
  `;

  const btn = meal.querySelector(".meal-body .fav-btn");
  const icon = meal.querySelector(".meal-body .fav-btn .love-btn");
  btn.addEventListener("click", async () => {
    icon.classList.toggle("react");
  });

  meals.append(meal);
}
