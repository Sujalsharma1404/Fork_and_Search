import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Contact from "./Pages/Contact";
import Header from "./Components/Header";


import About from "./Pages/About";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />

      </Routes>
      <Footer />

    </Router>

  );
}

export default App;
