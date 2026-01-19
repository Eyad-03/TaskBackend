import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";

function DisplayProducts() {
  const [products, setProducts] = useState([]);
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
  useEffect(() => {
    fetchProducts();
  }, []);

 async function handleDeleteProduct(productId)
  {

    try
    {
      const res = await api.delete(`/admin/products/${productId}`)

      if (res.status === 200) {
      setProducts((curProduct)=>curProduct.filter((product)=>productId!==product._id))

       toast.success(res.data.message);
      }

    }


    catch (err) {
      toast.error("Failed to delete product");
      console.log(err);
    }

  }

  return (
    <>
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
                  <button onClick={()=>handleDeleteProduct(product._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default DisplayProducts;