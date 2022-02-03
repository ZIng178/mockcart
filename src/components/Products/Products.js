import React, { useEffect, useState } from "react";
import "./products.css";
import { Fade, Zoom } from "react-awesome-reveal";
import Modal from "react-modal";

const Products = ({ products, addToCart }) => {
  const [modalState, setModalState] = useState({ product: null });
  console.log("products", products);
  console.log("modalstate", modalState);

  const openModal = (product) => {
    setModalState({ product });
  };

  const closeModal = () => {
    setModalState({ product: null });
  };

  const { product } = modalState;

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <ul className="products">
          <Fade bottom cascade>
            {products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a
                    herf={" #" + product._id}
                    onClick={() => openModal(product)}
                  >
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
          </Fade>
          {product && (
            <Modal isOpen={true} onRequestClose={closeModal}>
              <Zoom>
                <button className="close-modal" onClick={closeModal}>
                  x
                </button>

                <div className="product-details">
                  <img src={product.image} alt={product.title}></img>
                  <div className="product-details-description">
                    <p>
                      <strong> {product.title} </strong>
                    </p>
                    <p>{product.description}</p>
                    <p>
                      Available Sizes :{" "}
                      {product.availableSizes.map((sizes) => (
                        <span>
                          {" "}
                          <button className="button">{sizes} </button>
                        </span>
                      ))}
                    </p>
                    <div className="product-price">
                      <div> ${product.price}</div>
                      <button
                        className="button-primary"
                        onClick={() => {
                          addToCart(product);
                          closeModal();
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </Zoom>
            </Modal>
          )}
        </ul>
      </div>
    </>
  );
};

export default Products;
