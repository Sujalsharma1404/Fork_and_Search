

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Search recipes in Firestore by name
 * @param {string} query - Search term
 * @returns {Promise<Array>} - Matching recipes with Firestore ID
 */
export async function searchRecipes(query) {
  if (!query) return [];

  const lower = query.toLowerCase();
  const results = [];

  try {
    const snapshot = await getDocs(collection(db, "recipes"));
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.name && data.name.toLowerCase().includes(lower)) {
        results.push({
          firestoreId: doc.id, // ✅ IMPORTANT: use consistent Firestore ID
          ...data,
        });
      }
    });
  } catch (error) {
    console.error("Error searching recipes:", error);
  }

  return results;
}
