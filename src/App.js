//feature 1

import React, { useState, useEffect } from "react";
import Products from "./components/Products/Products";
import data from "./data.json";

function App() {
  const products = data.products;
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    console.log(products);
  }, [products]);
  return (
    <div className="grid-container">
      <header>
        <a href="/"> React Shopping Cart </a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Products products={products} />
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>All rights reserved</footer>
    </div>
  );
}

export default App;
