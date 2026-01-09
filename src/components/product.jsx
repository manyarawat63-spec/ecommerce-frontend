import React, { useReducer, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataReducer, initialState } from "../redux/dataReducer";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import { useSearch } from "../Context/SearchContext";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [state, localDispatch] = useReducer(dataReducer, initialState);
  const reduxDispatch = useDispatch();
  const cart = useSelector((state) => state.cart || []);
  const { search = "" } = useSearch();
  const { isLoggedIn, user } = useAuth(); // 👈 user bhi liya
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("none");

  // 🔹 FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await fetch(
  "https://ecommerce-backend-45a5.onrender.com/api/products"
);

      const data = await res.json();

      localDispatch({
        type: "LOAD_DATA",
        payload: data.products || data || [],
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      localDispatch({ type: "LOAD_DATA", payload: [] });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 FILTER + SORT + SEARCH
  const filteredProducts = (state.items || [])
    .filter((p) =>
      (p.product_name || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price_low") return a.product_price - b.product_price;
      if (sortBy === "price_high") return b.product_price - a.product_price;
      if (sortBy === "name_asc")
        return a.product_name.localeCompare(b.product_name);
      return 0;
    });

  // 🔹 CART HANDLERS
  const handleAdd = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    reduxDispatch(addToCart(product));
  };

  const handleInc = (product) => reduxDispatch(increaseQuantity(product));
  const handleDec = (product) => reduxDispatch(decreaseQuantity(product));

  // 🔥 DELETE PRODUCT (ADMIN)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const token = localStorage.getItem("token");

    try {
      await fetch(`http://ecommerce-backend-45a5.onrender.com/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts(); // refresh list
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-semibold text-gray-700">
          Showing {filteredProducts.length} of {state.items.length} products
        </h2>

        <select
          className="px-4 py-2 border bg-white rounded-lg shadow"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="none">Featured</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
          <option value="name_asc">Name A → Z</option>
        </select>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => {
          const inCart = cart.find((i) => i._id === product._id);
          const rating = Math.floor(Math.random() * 3) + 3;

          return (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >
              <img
                src={product.product_image || "/no-image.png"}
                alt={product.product_name}
                className="h-56 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">
                  {product.product_name}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.product_desc}
                </p>

                <div className="text-yellow-500 mt-2">
                  {"⭐".repeat(rating)} ({rating}.0)
                </div>

                <div className="mt-2">
                  <span className="font-bold text-indigo-600 text-lg">
                    ₹{product.product_price}
                  </span>
                </div>

                {/* CART SECTION */}
                <div className="mt-4">
                  {!isLoggedIn ? (
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
                    >
                      Login to Add
                    </button>
                  ) : !inCart ? (
                    <button
                      onClick={() => handleAdd(product)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleDec(product)}
                        className="px-3 py-1 bg-gray-300 rounded"
                      >
                        –
                      </button>
                      <span>{inCart.quantity}</span>
                      <button
                        onClick={() => handleInc(product)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                {/* 🔥 ADMIN ACTIONS */}
                {user?.role === "admin" && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit/${product._id}`)
                      }
                      className="flex-1 bg-yellow-500 text-white py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 bg-red-600 text-white py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
