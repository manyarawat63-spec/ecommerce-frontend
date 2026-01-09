import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../Context/SearchContext";
import { useAuth } from "../Context/AuthContext";
import { clearCart } from "../redux/cartSlice";

export default function Navbar() {
  const cart = useSelector((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const { search, setSearch } = useSearch();
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCart());
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                E
              </div>
              <span className="font-semibold text-lg">e-commerce</span>
            </Link>

            <Link to="/" className="text-sm font-medium text-gray-700">
              Home
            </Link>

            {isLoggedIn && (
              <Link to="/profile" className="text-sm font-medium text-gray-700">
                Profile
              </Link>
            )}

            {user?.role === "admin" && (
              <Link
                to="/admin/add-product"
                className="text-sm font-medium text-indigo-600"
              >
                Add Product
              </Link>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm ml-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {!isLoggedIn ? (
              <div className="flex gap-2">
                <Link to="/login" className="text-sm text-gray-700">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm bg-indigo-600 text-white px-3 py-1 rounded"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <span className="text-sm">Hi, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </div>
            )}

            <div className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
              </Link>

              {isLoggedIn && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
