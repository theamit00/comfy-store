import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  About,
  Auth,
  Cart,
  Checkout,
  Error,
  Private,
  Products,
  SingleProduct,
} from "./pages";

function App() {
  return (
    <Auth>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products">
            <Route index element={<Products />} />
            <Route path=":id" element={<SingleProduct />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route element={<Private />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </Auth>
  );
}

export default App;
