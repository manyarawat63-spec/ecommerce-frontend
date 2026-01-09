import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const [showEdit, setShowEdit] = useState(false);

  const user = useSelector((state) => state.user?.userData) || {
    name: "John Doe",
    email: "john@gmail.com",
    phone: "9876543210",
    address: "New Delhi, India"
  };

  const orders = useSelector((state) => state.order?.orders) || [
    {
      id: "ORD12345",
      date: "2024-11-15",
      total: 599,
      status: "Delivered",
      items: [
        { name: "Ice Cream", qty: 2, price: 199 },
        { name: "Frozen Pizza", qty: 1, price: 199 }
      ]
    },
    {
      id: "ORD98765",
      date: "2024-11-10",
      total: 249,
      status: "Shipped",
      items: [{ name: "Rice Pilaf Mix", qty: 3, price: 249 }]
    }
  ];

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
        <div className="max-w-3xl w-full space-y-6">

          {/* USER CARD */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-bold text-indigo-600">My Profile</h2>

            <div className="mt-4 space-y-2 text-gray-700">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
              {user.address && <p><strong>Address:</strong> {user.address}</p>}
            </div>

            <button
              onClick={() => setShowEdit(true)}
              className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          </div>

          {/* ORDER HISTORY */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-bold text-indigo-600">Order History</h2>

            {orders.length === 0 ? (
              <p className="text-gray-600 mt-3">No orders yet.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <p className="font-semibold text-lg">Order ID: {order.id}</p>
                    <p className="text-gray-600">Date: {order.date}</p>
                    <p className="text-gray-600">
                      Status:{" "}
                      <span className="font-bold text-indigo-600">{order.status}</span>
                    </p>
                    <p className="text-gray-600">
                      Total:{" "}
                      <span className="font-bold text-indigo-600">₹{order.total}</span>
                    </p>

                    <div className="mt-3">
                      <p className="font-semibold text-gray-700">Items:</p>
                      <ul className="list-disc list-inside text-gray-600">
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.name} (x{item.qty}) — ₹{item.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ⭐ EDIT PROFILE MODAL ⭐ */}
     {showEdit && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl">

      <h2 className="text-xl font-bold">Edit Profile</h2>

      <label className="block mt-3 font-semibold">Username</label>
      <input
        type="text"
        defaultValue={user.name}
        className="w-full border rounded p-2 mt-1"
      />

      <label className="block mt-3 font-semibold">
        Email address (cannot be changed)
      </label>
      <input
        type="email"
        disabled
        defaultValue={user.email}
        className="w-full border rounded p-2 mt-1 bg-gray-100 cursor-not-allowed"
      />

      <div className="flex justify-end gap-3 mt-5">
        
        {/* Cancel */}
        <button
          onClick={() => setShowEdit(false)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>

        {/* Save Changes */}
        <button
          onClick={() => {
            // OPTIONAL: update Redux + backend here
            // dispatch(updateUser({...}))
            
            setShowEdit(false); // Modal close → Profile visible again
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Save Changes
        </button>
      </div>

    </div>
  </div>
)}
    </>
  );
}