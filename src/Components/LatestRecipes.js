import React, { useState, useEffect } from "react";
import "./LatestRecipes.css";
import { Link } from "react-router-dom";
import categoryData from "./Data/CategoryData.json"; // Adjust the path if needed

export default function LatestRecipes() {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    // Flatten all dishes from all categories
    const allDishes = categoryData.flatMap((category) => category.dishes);

    // Shuffle the dishes
    const shuffled = allDishes.sort(() => 0.5 - Math.random());

    // Pick first 3
    const selected = shuffled.slice(0, 3);

    setRandomRecipes(selected);
  }, []);

  return (
    <section className="latest-recipes">
      <h2> Recipes</h2>
      <div className="recipes-grid">
        {randomRecipes.map((dish) => (
          <div className="recipe-card" key={dish.id}>
            <img
              src={dish.image || "/placeholder-image.jpg"}
              alt={dish.name || "Dish"}
              onError={(e) => {
                e.target.src = "/placeholder-image.jpg";
              }}
            />
            <div className="recipe-info">
              <h3>{dish.name || "Untitled"}</h3>
              {dish.description && <p>{dish.description}</p>}

              {/* ✅ Link to DishDetail with dishId */}
              <Link to={`/dish/${dish.id}`}>
                <button className="view-btn">View Recipe</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
