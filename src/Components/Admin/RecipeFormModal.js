// ✅ src/Components/Admin/RecipeFormModal.js
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./RecipeFormModal.css";

export default function RecipeFormModal({ show, handleClose, editRecipe }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientQty, setNewIngredientQty] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [time, setTime] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(data);
    };
    fetchCategories();
  }, [show]);

  useEffect(() => {
    if (editRecipe) {
      setName(editRecipe.name || "");
      setCategory(editRecipe.category || "");
      setImage(editRecipe.image || "");
      setDescription(editRecipe.description || "");
      setSteps(editRecipe.steps || []);
      setIngredients(editRecipe.ingredients || []);
      setTime(editRecipe.time || "");
      setDifficulty(editRecipe.difficulty || "");
    } else {
      setName("");
      setCategory("");
      setImage("");
      setDescription("");
      setSteps([]);
      setIngredients([]);
      setTime("");
      setDifficulty("");
    }
  }, [editRecipe]);

  const handleSave = async () => {
    if (!name || !category) {
      alert("Please fill in required fields.");
      return;
    }

    const data = {
      name,
      category,
      image,
      description,
      steps,
      ingredients,
      time,
      difficulty,
    };

    try {
      if (editRecipe) {
        await updateDoc(doc(db, "recipes", editRecipe.id), data);
        alert("Recipe updated!");
      } else {
        await addDoc(collection(db, "recipes"), data);
        alert("Recipe added!");
      }
      handleClose(true);
    } catch (err) {
      console.error(err);
      alert("Error saving recipe.");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await addDoc(collection(db, "categories"), {
        category: newCategory,
      });
      alert("Category added!");
      setNewCategory("");
    } catch (err) {
      console.error(err);
      alert("Failed to add category.");
    }
  };

  const handleAddStep = () => {
    if (!newStep.trim()) return;
    setSteps([...steps, newStep.trim()]);
    setNewStep("");
  };

  const handleRemoveStep = (index) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  const handleAddIngredient = () => {
    if (!newIngredientName.trim()) return;
    setIngredients([...ingredients, { name: newIngredientName.trim(), quantity: newIngredientQty.trim() }]);
    setNewIngredientName("");
    setNewIngredientQty("");
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  return (
    <Modal show={show} onHide={() => handleClose(false)} size="lg" centered className="recipe-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>{editRecipe ? "Edit Recipe" : "Add Recipe"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Recipe Name *</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter recipe name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category *</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Add new category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={handleAddCategory}>
                  ➕
                </Button>
              </InputGroup>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cooking Time</Form.Label>
                <Form.Control
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 30 mins"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Difficulty</Form.Label>
                <Form.Control
                  type="text"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  placeholder="Easy, Medium, Hard"
                />
              </Form.Group>

            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief recipe description"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Steps / Instructions</Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Add step"
                    value={newStep}
                    onChange={(e) => setNewStep(e.target.value)}
                  />
                  <Button variant="outline-success" onClick={handleAddStep}>
                    ➕
                  </Button>
                </InputGroup>
                <ul className="steps-list">
                  {steps.map((step, index) => (
                    <li key={index}>
                      {step}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="ms-2"
                        onClick={() => handleRemoveStep(index)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </Form.Group>

              <Form.Group>
                <Form.Label>Ingredients</Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Quantity (e.g. 1 cup)"
                    value={newIngredientQty}
                    onChange={(e) => setNewIngredientQty(e.target.value)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Ingredient name"
                    value={newIngredientName}
                    onChange={(e) => setNewIngredientName(e.target.value)}
                  />
                  <Button variant="outline-success" onClick={handleAddIngredient}>
                    ➕
                  </Button>
                </InputGroup>
                <ul className="steps-list">
                  {ingredients.map((ing, index) => (
                    <li key={index}>
                      {ing.quantity} {ing.name}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="ms-2"
                        onClick={() => handleRemoveIngredient(index)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {editRecipe ? "Update" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
