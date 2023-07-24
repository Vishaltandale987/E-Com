import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Man from "../Pages/Man/Man";
import Women from "../Pages/Women/Women";
import Cart from "../Pages/Cart/Cart";
import Admin from "../Pages/Admin/Admin";

function All_Routes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/man" element={<Man />}></Route>
        <Route path="/women" element={<Women />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </div>
  );
}

export default All_Routes;
