import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice.js";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const totalAmount = cart.reduce(
    (total, item) => total + item.product_price * item.quantity,
    0
  );

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);

      // 🟢 Save user checkout details to localStorage
      const profileData = {
        name: fullName,
        email: email,
        orders: cart,
        total: totalAmount.toFixed(2),
        paymentStatus: "Success",
        date: new Date().toLocaleString(),
      };

      localStorage.setItem("profileData", JSON.stringify(profileData));

      // Clear cart
      dispatch(clearCart());

      // Navigate to profile page
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT — Order Summary */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-4">
              <div>
                <h3 className="font-semibold text-gray-800">{item.product_name}</h3>
                <p className="text-gray-500">₹{item.product_price} × {item.quantity}</p>
              </div>
              <p className="font-bold text-indigo-600">
                ₹{item.product_price * item.quantity}
              </p>
            </div>
          ))}

          <div className="flex justify-between mt-6 text-xl font-bold">
            <p>Total:</p>
            <p className="text-indigo-600">₹{totalAmount.toFixed(2)}</p>
          </div>
        </div>

        {/* RIGHT — Payment Form */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Payment Details</h2>

          {paymentSuccess ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                🎉 Payment Successful!
              </h2>
              <p className="text-gray-500">Redirecting to your home page...</p>
            </div>
          ) : (
            <form onSubmit={handlePayment} className="space-y-4">

              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  required
                  maxLength="16"
                  placeholder="1234 5678 9012 3456"
                  className="w-full border px-3 py-2 rounded-lg focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    required
                    className="w-full border px-3 py-2 rounded-lg focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">CVV</label>
                  <input
                    type="password"
                    required
                    maxLength="3"
                    className="w-full border px-3 py-2 rounded-lg focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg shadow-md transition"
              >
                {loading ? "Processing Payment..." : "Pay Now"}
              </button>

            </form>
          )}
        </div>
      </div>

    </div>
  );
}
