import { connect } from "react-redux";
import React, { useState } from "react";
import "./filter.css";
import { filterProducts, sortProducts } from "../../actions/productActions";
import data from "../../data.json";

const Filter = ({
  count,
  sortProducts,
  filterProducts,
  products,
  size,
  sort,
  filteredProducts,
}) => {
  // const [size, setSize] = useState([""]);

  // const handleSize = (e) => {
  //   setSize(e.target.value);
  // };

  console.log("size", size);
  console.log("datajson", data.products);
  return (
    <div className="filter">
      <div className="filter-result">{count} Products</div>

      <div className="filter-sort">
        Order{" "}
        <select
          value={sort}
          onChange={(e) => sortProducts(filteredProducts, e.target.value)}
        >
          <option value="latest"> Latest</option>
          <option value="lowest"> Lowest</option>
          <option value="highest"> Highest</option>
        </select>
      </div>
      <div className="filter-size">Filter</div>
      <select
        value={size}
        onChange={(e) => filterProducts(products, e.target.value)}
      >
        <option value="">Sizes</option>
        <option value="8">8</option>
        <option value="8.5">8.5</option>
        <option value="9">9</option>
        <option value="9.5">9.5</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="12.5">12.5</option>
      </select>
    </div>
  );
};

export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
  }
)(Filter);
