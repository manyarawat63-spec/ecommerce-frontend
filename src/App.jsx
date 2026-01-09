import React from "react";
import Navbar from "./components/nav.jsx";
import ProductList from "./components/product.jsx";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/Pofile.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import AdminProtectedRoute from "./admin/AdminProtectedRoute.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER PROTECTED */}
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />

        {/* 🔥 ADMIN PROTECTED */}
        <Route
          path="/admin/add-product"
          element={
            <AdminProtectedRoute>
              <AddProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/edit/:id"
          element={
            <AdminProtectedRoute>
              <EditProduct />
            </AdminProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </AuthProvider>
      
  );
  
}

export default App;
