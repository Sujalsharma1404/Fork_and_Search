import React, { useState, useEffect } from "react";
import "./LatestRecipes.css";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function LatestRecipes() {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const recipesRef = collection(db, "recipes");
        const querySnapshot = await getDocs(recipesRef);

        const allRecipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Shuffle recipes
        const shuffled = allRecipes.sort(() => 0.5 - Math.random());
        // Pick first 3
        const selected = shuffled.slice(0, 3);

        setRandomRecipes(selected);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRandomRecipes();
  }, []);

  return (
    <section className="latest-recipes">
      <h2>Latest Recipes</h2>
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
