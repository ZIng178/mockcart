import React from "react";
import "./products.css";

const Products = ({ products, addToCart }) => {
  console.log("products", products);
  return (
    <>
      <div>
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a herf={" #" + product._id}>
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </a>
                <div className="productprice">
                  <div>${product.price}</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="button-primary"
                  >
                    {" "}
                    Add to cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Products;
