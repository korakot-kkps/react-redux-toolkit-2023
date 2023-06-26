import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { NavBar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import { Products } from "./pages/products";
import { Cart } from "./pages/cart";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* routes */}
      <Routes>
        <Route index path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
