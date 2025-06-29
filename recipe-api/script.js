// Select HTML elements
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const recipesDiv = document.getElementById("recipes");
const modal = document.getElementById("recipeModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

// Function to Fetch Recipes by Name
async function fetchRecipesByName(mealName) {
    const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        displayRecipes(data.meals);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to Display Recipes
function displayRecipes(meals) {
    recipesDiv.innerHTML = ""; 

    if (!meals) {
        recipesDiv.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    meals.forEach(meal => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        const isWishlisted = wishlist.some(item => item.id === meal.idMeal);

        recipeCard.innerHTML = `
            <div class="recipe-content">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" onclick="fetchRecipeDetails('${meal.idMeal}')">
                <h3>${meal.strMeal}</h3>
            </div>
            <button class="wishlist-btn ${isWishlisted ? 'added' : ''}" id="btn-${meal.idMeal}" 
                onclick="addToWishlist('${meal.idMeal}', '${meal.strMeal}', '${meal.strMealThumb}')">
                ${isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
            </button>
        `;

        recipesDiv.appendChild(recipeCard);
    });
}

// Function to Fetch and Display Recipe Details in a Modal
async function fetchRecipeDetails(mealId) {
    const API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const meal = data.meals[0];

        modalContent.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
        `;

        openModal();
    } catch (error) {
        console.error("Error fetching recipe details:", error);
    }
}

// Function to Add Recipes to Wishlist
function addToWishlist(mealId, mealName, mealImage) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const button = document.getElementById(`btn-${mealId}`);

    if (wishlist.some(item => item.id === mealId)) {
        alert("Already in Wishlist!");
        return;
    }

    wishlist.push({ id: mealId, name: mealName, image: mealImage });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    button.classList.add("added");
    button.textContent = "Added to Wishlist";
}

// Function to Open Modal
function openModal() {
    modal.style.display = "block";
    document.body.classList.add("no-scroll");
}

// Function to Close Modal
function closeModalFunc() {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
}

// Attach event listener to close modal
closeModal.addEventListener("click", closeModalFunc);

// Event Listener for Search Button
searchBtn.addEventListener("click", () => {
    const query = searchBox.value.trim();
    fetchRecipesByName(query);
});

// Load Default Recipes
document.addEventListener("DOMContentLoaded", () => {
    fetchRecipesByName("Salad");
});
