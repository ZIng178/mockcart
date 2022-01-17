//feature 1

import React, { useState, useEffect } from "react";
import Filter from "./components/Filter/Filter";
import Products from "./components/Products/Products";
import data from "./data.json";

function App() {
  const [productState, setProductState] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  const filterProducts = (event) => {
    if (event.target.value === " ") {
      setSize(event.target.value);
      setProductState(productState);
    } else {
      setSize(event.target.value);

      console.log("productState", productState);
      setProductState(
        productState.filter(
          (product) => product.availableSizes.indexOf(event.target.value) > -1
        )
      );
    }
  };
  const sortProducts = (event) => {
    const sort = event.target.value;
    setSort(sort);
    setProductState(
      productState
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        )
    );
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/"> React Shopping Cart </a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={productState.length}
              size={productState.size}
              sort={productState.sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <Products products={productState} />
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>All rights reserved</footer>
    </div>
  );
}

export default App;
