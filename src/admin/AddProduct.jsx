import React, { useState } from "react";

export default function AddProduct() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    product_name: "",
    product_price: "",
    product_desc: "",
    discount: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) =>
      formData.append(key, form[key])
    );
    formData.append("product_image", image);

    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add product");

      alert("✅ Product added successfully");

      setForm({
        product_name: "",
        product_price: "",
        product_desc: "",
        discount: "",
        stock: "",
      });
      setImage(null);
      setPreview(null);
    } catch  {
      alert("❌ Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🛒 Add New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* LEFT */}
          <div className="space-y-4">
            <input
              type="text"
              name="product_name"
              placeholder="Product Name"
              value={form.product_name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />

            <input
              type="number"
              name="product_price"
              placeholder="Price"
              value={form.product_price}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />

            <textarea
              name="product_desc"
              placeholder="Description"
              value={form.product_desc}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg px-4 py-2"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="discount"
                placeholder="Discount (%)"
                value={form.discount}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="h-48 object-contain mb-4"
              />
            ) : (
              <p className="text-gray-400 mb-4">
                Image Preview
              </p>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full"
            />
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
