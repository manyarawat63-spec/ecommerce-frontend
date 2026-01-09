import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  // 🔹 GET ALL PRODUCTS
  useEffect(() => {
    fetch("http://ecommerce-backend-45a5.onrender.com/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // 🔴 DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await fetch(`http://ecommerce-backend-45a5.onrender.com/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // UI update
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Admin – Product Management</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.product_name}</td>
              <td>₹{p.product_price}</td>
              <td>
                {/* ✏️ EDIT */}
                <Link
                  to={`/admin/edit/${p._id}`}
                  style={{ marginRight: "10px", color: "blue" }}
                >
                  Edit
                </Link>

                {/* 🗑 DELETE */}
                <button
                  onClick={() => handleDelete(p._id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
