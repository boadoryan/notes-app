import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import CreateNote from "./pages/create-note/CreateNote";
import SavedNotes from "./pages/saved-notes/SavedNotes";
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/saved-notes" element={<SavedNotes />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
