// src/utils/search.js
export function searchRecipes(query, categories) {
  if (!query) return [];
  const lower = query.toLowerCase();

  const results = [];

  categories.forEach((cat) => {
    cat.dishes.forEach((dish) => {
      if (dish.name.toLowerCase().includes(lower)) {
        results.push({
          ...dish,
          category: cat.category,
        });
      }
    });
  });

  return results;
}
