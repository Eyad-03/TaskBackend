import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";

function DisplayCategories() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      console.log("res categories:", res);
      //check if there is no categories
      if (res.data.categories.length === 0) {
        toast.error(res.data.message || "No categories found");
        return;
      }
      setCategories(res.data.categories);
    } catch (err) {
      toast.error("Failed to fetch categories");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleDeleteCategory(categoryId) {
    
    try
    {
      const res = await api.delete(`/admin/categories/${categoryId}`)
      if(res.status===200)
      {
        setCategories((curCategory)=>curCategory.filter((category)=>category._id!==categoryId))
        toast.success('delete success')
      }
    }

    catch(err)
    {
      toast.error('faild delete category')
      console.log(err);
    }

  }

  return (
    <>

      <h3>Categories</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            return (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.description || "category description"}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={()=>handleDeleteCategory(category._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default DisplayCategories;