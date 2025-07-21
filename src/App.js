import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import About from './Pages/About';
import RecipesPage from './Pages/RecipesPage';
import CategoryPage from './Pages/CategoryPage';
import DishDetail from './Pages/DishDetail';
import Footer from './Components/Footer';
import ScrollToTop from "./ScrollToTop";
import AdminRoute from "./AdminRoute";
import AdminPage from "./Pages/AdminPage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={< Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/dish/:dishId" element={<DishDetail />} />
        <Route path="/admin" element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        } />
      </Routes>
      <Footer />

    </Router>

  );
}

export default App;