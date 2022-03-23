import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import About from "./pages/About";
import Posts from "./pages/Posts";
import NotFound from "./pages/NotFound";
import PostIdPage from "./pages/PostIdPage";
import './styles/App.css'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route exact path="/posts" element={<Posts />} /> 
        <Route exact path="/posts/:id" element={<PostIdPage />} /> 
        <Route path="*" element={<NotFound />} />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
