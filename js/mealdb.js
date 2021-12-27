document.getElementById("error-message").style.display = "none";

const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // clear data
  searchField.value = "";
  document.getElementById("error-message").style.display = "none";
  if (searchText == "") {
    alert("Please write any item name");
  } else {
    // load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.meals))
      .catch((error) => displayError(error));
  }
};

const displayError = (error) => {
  document.getElementById("error-message").style.display = "block";
};

const displaySearchResult = (meals) => {
  const searchResult = document.getElementById("search-result");
  searchResult.innerHTML = "";
  // if (meals.length == 0) {
  //   alert("No result found!");
  // }
  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div onclick="loadMealDetail(${meal.idMeal})" class="card">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">
              ${meal.strInstructions.slice(0, 250)}
            </p>
          </div>
      </div>
    `;
    searchResult.appendChild(div);
  });
};

const loadMealDetail = (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0]));
};

const displayMealDetail = (meal) => {
  const mealDetails = document.getElementById("meal-details");
  mealDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
      <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">
          ${meal.strInstructions}
        </p>
        <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Watch Tutorial</a>
      </div>
  `;
  mealDetails.appendChild(div);
};
