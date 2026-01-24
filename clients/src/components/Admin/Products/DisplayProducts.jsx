import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";

function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
    const [editedId, setEditedId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
    name: "",
    description: "",
    price: "",
    thumbnail: "",
    stock: "",
    category: "",
    });
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


    const handleSave = async (id) => {
    try {
      const res =await api.put(`/admin/products/${id}`, editedProduct);
      toast.success("product update");
      setEditedId(null)
      fetchProducts()
    } catch (err) {
      toast.error("faild update");
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
            const isEditing = editedId === product._id;
            return (
              <tr key={product._id}>
                <td>{index + 1}</td>

                <td>
                  {isEditing ? (
                    <input
                      name="name"
                      value={editedProduct.name}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.name
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      name="description"
                      value={editedProduct.description}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.description
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      name="price"
                      value={editedProduct.price}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          price: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.price
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      name="thumbnail"
                      value={editedProduct.thumbnail}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          thumbnail: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.thumbnail
                  )}
                </td>

                                <td>
                  {isEditing ? (
                    <input
                      name="stock"
                      value={editedProduct.stock}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          stock: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.stock
                  )}
                </td>


                  <td>
                  {isEditing ? (
                    <input
                      name="category"
                      value={editedProduct.category}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.category
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <>
                      <button onClick={() => handleSave(product._id)}>
                        save
                      </button>
                      <button>cancel</button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditedId(product._id);
                          setEditedProduct({
                            name: product.name,
                            description: product.description,
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
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
