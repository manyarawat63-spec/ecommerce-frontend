import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    product_name: "",
    product_price: "",
    product_desc: "",
  });
  const [image, setImage] = useState(null);

  // 🔹 Load product data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const product = data.find((p) => p._id === id);
        if (product) {
          setForm({
            product_name: product.product_name,
            product_price: product.product_price,
            product_desc: product.product_desc,
          });
        }
      });
  }, [id]);

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", form.product_name);
    formData.append("product_price", form.product_price);
    formData.append("product_desc", form.product_desc);
    if (image) formData.append("product_image", image);

    await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    alert("Product updated successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Update Product</h2>

        <input
          value={form.product_name}
          onChange={(e) =>
            setForm({ ...form, product_name: e.target.value })
          }
          placeholder="Product Name"
          className="w-full border p-2 rounded"
        />

        <input
          value={form.product_price}
          onChange={(e) =>
            setForm({ ...form, product_price: e.target.value })
          }
          placeholder="Price"
          className="w-full border p-2 rounded"
        />

        <textarea
          value={form.product_desc}
          onChange={(e) =>
            setForm({ ...form, product_desc: e.target.value })
          }
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
