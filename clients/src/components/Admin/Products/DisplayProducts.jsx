import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";

function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    thumbnail: "",
    stock: "",
    category: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      // console.log(res);
      //check if there is no products
      if (res.data.products.length === 0) {
        toast.error(res.data.message || "No products found");
        return;
      }
      setProducts(res.data.products);
    } catch (err) {
      toast.error("Failed to fetch products");
      console.log(err);
    }
  };

  async function handleDeleteProduct(productId) {
    try {
      const res = await api.delete(`/admin/products/${productId}`);

      if (res.status === 200) {
        setProducts((curProduct) =>
          curProduct.filter((product) => productId !== product._id),
        );

        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to delete product");
      console.log(err);
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/products", newProduct);

      if (res.status !== 201) {
        toast.error(res.data.message);
        return;
      }

      setProducts((prev) => [...prev, newProduct]);
      toast.success(res.data.message || "added successfully");
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <button onClick={() => setShowForm(!showForm)}>Add product</button>
      <h3>Products</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stocks</th>
            <th>Description</th>
            <th>Thumbnail</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.description || "product description"}</td>
                <td>
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    width="50"
                    height="50"
                  />
                </td>
                <td>{product.category}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showForm && (
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="name"
            id="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            required
            placeholder="name"
          />

          <input
            type="text"
            name="description"
            id="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            required
            placeholder="description"
          />

          <input
            type="text"
            name="price"
            id="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            required
            placeholder="price"
          />
          <input
            type="text"
            name="thumbnail"
            id="thumbnail"
            value={newProduct.thumbnail}
            onChange={(e) =>
              setNewProduct({ ...newProduct, thumbnail: e.target.value })
            }
            required
            placeholder="thumbnail"
          />
          <input
            type="text"
            name="stock"
            id="stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            required
            placeholder="stock"
          />
          <input
            type="text"
            name="category"
            id="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            required
            placeholder="category"
          />

          <button type="submit">Add</button>
        </form>
      )}
    </>
  );
}
export default DisplayProducts;
