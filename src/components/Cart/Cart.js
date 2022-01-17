import React from "react";
import "./cart.css";

const Cart = ({ cartElements, removeFromCart }) => {
  return (
    <>
      <div>
        {console.log("cardElements", cartElements)}

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
            <div className="cart">
              <div className="total">
                <div>
                  Total : $
                  {cartElements.reduce(
                    (acc, curr) => acc + curr.price * curr.count,
                    0
                  )}
                  <button className="button primary"> Proceed </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
