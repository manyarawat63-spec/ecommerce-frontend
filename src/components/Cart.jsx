import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/cartSlice.js";


export default function Cart() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalAmount = cart.reduce(
    (total, item) => total + item.product_price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-gray-400">
        🛒 Your cart is empty!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SECTION — Cart Items */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-xl p-5">
          <h1 className="text-2xl font-bold text-indigo-600 mb-6 text-center lg:text-left">
            Your Shopping Cart
          </h1>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4"
            >
              {/* Product Details */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="w-20 h-20 object-cover rounded-md shadow-sm"
                />
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    {item.product_name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    ₹{item.product_price}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(decreaseQuantity(item))}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-lg"
                >
                  −
                </button>

                <span className="text-lg font-medium">{item.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQuantity(item))}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SECTION — Summary Box */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-fit sticky top-20">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

          <div className="flex justify-between text-lg mb-2">
            <p className="text-gray-700">Subtotal:</p>
            <p className="font-semibold text-gray-900">₹{totalAmount.toFixed(2)}</p>
          </div>

          <div className="flex justify-between text-lg mb-2">
            <p className="text-gray-700">Delivery:</p>
            <p className="font-semibold text-gray-900">Free</p>
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between text-xl font-bold mb-6">
            <p>Total:</p>
            <p className="text-indigo-600">₹{totalAmount.toFixed(2)}</p>
          </div>

          {/* Payment Button */}
          
          <button onClick={() => navigate("/checkout")}
       className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg shadow-md transition">
        Proceed to checkout
       </button>


          {/* Clear Cart */}
          <button
            onClick={() => {dispatch(clearCart()); navigate("/");}}
            className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-sm shadow-md transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
