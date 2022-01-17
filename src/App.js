//feature 1

import React, { useState, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Filter from "./components/Filter/Filter";
import Products from "./components/Products/Products";
import data from "./data.json";

function App() {
  const [productState, setProductState] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartElements, setCartElements] = useState([]);

  console.log(cartElements);

  const removeFromCart = (productState) => {
    const cartItems = cartElements.slice();

    setCartElements(cartItems.filter((item) => item._id !== productState._id));
  };

  const addToCart = (productState) => {
    const cartItems = cartElements.slice();
    console.log("carItems", cartElements);
    let itemInCart = false;
    cartItems.forEach((item) => {
      if (item._id === productState._id) {
        item.count++;
        itemInCart = true;
      }
    });
    if (!itemInCart) {
      cartItems.push({ ...productState, count: 1 });
    }
    setCartElements(cartItems);
  };

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
            <Products products={productState} addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart
              cartElements={cartElements}
              m
              removeFromCart={removeFromCart}
            />
          </div>
        </div>
      </main>
      <footer>All rights reserved</footer>
    </div>
  );
}

export default App;
