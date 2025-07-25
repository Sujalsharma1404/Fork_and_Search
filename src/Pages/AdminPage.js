// ✅ src/Pages/AdminPage.js
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import RecipeFormModal from "../Components/Admin/RecipeFormModal";
import Header from "../Components/Header";
import { Button, Table, Container, Spinner, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./../Components/Style/AdminPage.css";

export default function AdminPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

  // ✅ Keep Firestore ID separate
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const data = querySnapshot.docs.map((docSnap) => ({
        firestoreId: docSnap.id, // ✅ Real Firestore ID
        ...docSnap.data(),
      }));
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const data = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setCategories(data.map((cat) => cat.category));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  const handleDelete = async (firestoreId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteDoc(doc(db, "recipes", firestoreId));
        setRecipes((prev) => prev.filter((r) => r.firestoreId !== firestoreId));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Error deleting recipe. Try again.");
      }
    }
  };

  const handleEdit = (recipe) => {
    console.log("Editing Recipe:", recipe);
    setEditRecipe(recipe);
    setShowForm(true);
  };

  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter((r) => r.category === selectedCategory);

  return (
    <>
      <Header />
      <Container className="admin-page py-5">
        <h1 className="mb-4">Admin Dashboard</h1>

        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
          <div className="d-flex gap-2 flex-wrap">
            <Button
              variant="success"
              onClick={() => {
                setEditRecipe(null);
                setShowForm(true);
              }}
            >
              ➕ Add New Recipe
            </Button>

            <Button variant="secondary" onClick={() => navigate("/admin/users")}>
              👥 Manage Users
            </Button>

            <Button variant="info" onClick={() => navigate("/admin/contacts")}>
              📩 View Contact Messages
            </Button>
          </div>

          <Form.Select
            style={{ maxWidth: "220px" }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status" />
            <div>Loading recipes...</div>
          </div>
        ) : filteredRecipes.length === 0 ? (
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
              {filteredRecipes.map((recipe) => (
                <tr key={recipe.firestoreId}>
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
                      onClick={() => handleDelete(recipe.firestoreId)}
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
