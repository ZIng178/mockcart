import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from "../type";
import data from "../data.json";

const datajson = data.products;
console.log("datajson", datajson);
export const fetchProducts = () => async (dispatch) => {
  // const res = await fetch("/api/products");
  // const data = await res.json();
  // console.log(data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: datajson,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  console.log("filterProductActions", products);
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : datajson.filter((x) => x.availableSizes.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  console.log("filteredPRoducts", filteredProducts);
  const sortedProducts = filteredProducts.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
