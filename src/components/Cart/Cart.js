import React, { useState } from "react";
import "./cart.css";
import { Fade } from "react-awesome-reveal";
import { connect } from "react-redux";
import { removeFromCart } from "../../actions/cartActions";

const Cart = ({ removeFromCart, cartItems }) => {
  const [showCheckOut, setShowCheckOut] = useState(false);
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

  const createOrder = (data, e) => {
    const order = {
      name: name,
      email: email,
      address: address,
      cartItems: cartItems,
    };
    createOrder(order);

    console.log("order", order);
  };

  return (
    <>
      <Fade left cascade>
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
          <div>
            <div className="cart" key={cartItems._id}>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div> {item.title}</div>
                    <div className="right">
                      ${item.price} X {item.count}{" "}
                      <button onClick={() => removeFromCart(item)}>
                        Remove
                      </button>{" "}
                    </div>
                  </li>
                ))}
              </ul>
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
                      <button
                        onClick={() => setShowCheckOut(true)}
                        className="button primary"
                      >
                        {" "}
                        Proceed{" "}
                      </button>
                    </div>
                  </div>

                  {showCheckOut && (
                    <Fade left>
                      <div key={cartItems._id}>
                        <ul className="form-container">
                          <form>
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
                                onClick={(event) => createOrder(event)}
                                className="button primary"
                              >
                                Checkout
                              </button>
                            </li>
                          </form>
                        </ul>
                      </div>
                    </Fade>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Fade>
    </>
  );
};

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart }
)(Cart);
