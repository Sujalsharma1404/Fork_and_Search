// ✅ src/Pages/AdminPage.js
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import RecipeFormModal from "../Components/Admin/RecipeFormModal";
import Header from "../Components/Header";
import { Button, Table, Container, Spinner } from "react-bootstrap";
import "./../Components/Style/AdminPage.css";

export default function AdminPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);

  const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteDoc(doc(db, "recipes", id));
        setRecipes(recipes.filter((r) => r.id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleEdit = (recipe) => {
    setEditRecipe(recipe);
    setShowForm(true);
  };

  return (
    <>
      <Header />
      <Container className="admin-page py-5">
        <h1 className="mb-4">Admin Dashboard</h1>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Manage Recipes</h4>
          <Button variant="success" onClick={() => { setEditRecipe(null); setShowForm(true); }}>
            ➕ Add New Recipe
          </Button>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" /> Loading recipes...
          </div>
        ) : recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          <Table striped bordered hover responsive className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th style={{ width: "180px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.name}</td>
                  <td>{recipe.category}</td>
                  <td>{recipe.description?.slice(0, 50)}...</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(recipe)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <RecipeFormModal
          show={showForm}
          handleClose={(refresh) => {
            setShowForm(false);
            setEditRecipe(null);
            if (refresh) fetchRecipes();
          }}
          editRecipe={editRecipe}
        />
      </Container>
    </>
  );
}
