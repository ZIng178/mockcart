import React, { useState, useEffect } from "react";
import "./cart.css";
import { Fade, Zoom } from "react-awesome-reveal";
import { connect } from "react-redux";
import { removeFromCart } from "../../actions/cartActions";
import { createOrder, clearOrder } from "../../actions/orderActions";
import Modal from "react-modal";

const Cart = ({ removeFromCart, cartItems }) => {
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [order, setOrder] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressInput = (e) => {
    setAddress(e.target.value);
  };

  console.log("NAME", name);
  console.log("EMAIL", email);
  console.log("ADDRESS", address);

  const createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: name,
      email: email,
      address: address,
      cartItems: cartItems,
      total: cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    setOrder(order);
  };

  const closeModal = () => {
    setOrder(null);
  };

  return (
    <div>
      {/* {console.log("cardItems", cartItems)} */}

      {cartItems.length === 0 ? (
        <div className="cart cart-header"> Cart is empty </div>
      ) : (
        <div className="cart cart-header">
          {" "}
          You have {cartItems.length} items in the cart{" "}
        </div>
      )}

      {order && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              x{" "}
            </button>
            <div className="order-details">
              <h3 className="success-message"> Your order has been placed</h3>
              <h2>Order{order._id}</h2>
              <ul className="order-class">
                <li>
                  <div>Name:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>Email:</div>
                  <div>{order.email}</div>
                </li>
                <li>
                  <div>Address:</div>
                  <div>{order.address}</div>
                </li>
                <li>
                  <div>Total:</div>
                  <div>${order.total}</div>
                </li>
                <li>
                  <div>Cart Items:</div>
                  <div>
                    {order.cartItems.map((x) => (
                      <div>
                        {x.count} x {x.title}
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h1> Thank you shopping with KICKSKART</h1>
            </div>
          </Zoom>
        </Modal>
      )}
      <div>
        <div className="cart" key={cartItems._id}>
          <Fade left cascade>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div> {item.title}</div>
                    <div className="right">
                      ${item.price} X {item.count}{" "}
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove
                      </button>{" "}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total : $
                  {cartItems.reduce(
                    (acc, curr) => acc + curr.price * curr.count,
                    0
                  )}
                </div>
                <button
                  onClick={() => setShowCheckOut(true)}
                  className="button-primary"
                >
                  {" "}
                  Proceed{" "}
                </button>
              </div>
            </div>

            {showCheckOut && (
              <Fade right cascade>
                <div className="cart" key={cartItems._id}>
                  <form onSubmit={createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          type="email"
                          name="name"
                          required={true}
                          onChange={handleEmailInput}
                        />
                      </li>

                      <li>
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          required={true}
                          onChange={handleNameInput}
                        />
                      </li>

                      <li>
                        <label>Address</label>
                        <input
                          type="text"
                          name="name"
                          required={true}
                          onChange={handleAddressInput}
                        />
                      </li>
                      <li>
                        <button
                          className="button-primary"
                          type="submit"
                          // onClick={createOrder}
                        >
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);
