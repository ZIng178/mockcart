import React, { useState } from "react";
import "./cart.css";

const Cart = ({ cartElements, removeFromCart, createOrders }) => {
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
      cartElements: cartElements,
    };
    createOrders(order);

    console.log("order", order);
  };

  return (
    <>
      <div>
        {/* {console.log("cardElements", cartElements)} */}

        {cartElements.length === 0 ? (
          <div className="cart cart-header"> Cart is empty </div>
        ) : (
          <div className="cart cart-header">
            {" "}
            You have {cartElements.length} items in the cart{" "}
          </div>
        )}
        <div>
          <div className="cart" key={cartElements._id}>
            <ul className="cart-items">
              {cartElements.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div> {item.title}</div>
                  <div className="right">
                    ${item.price} X {item.count}{" "}
                    <button onClick={() => removeFromCart(item)}>Remove</button>{" "}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartElements.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total : $
                    {cartElements.reduce(
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
                  <div key={cartElements._id}>
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
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
