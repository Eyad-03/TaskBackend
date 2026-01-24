import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";

function DisplayCategories() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [editedCategory, setEditedCategory] = useState({
    name: "",
    description: "",
  });
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

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

  async function handleDeleteCategory(categoryId) {
    try {
      const res = await api.delete(`/admin/categories/${categoryId}`);
      if (res.status === 200) {
        setCategories((curCategory) =>
          curCategory.filter((category) => category._id !== categoryId),
        );
        toast.success("delete success");
      }
    } catch (err) {
      toast.error("faild delete category");
      console.log(err);
    }
  }

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/categories", newCategory);

      if (res.status !== 201) {
        toast.error(res.data.message);
        return;
      }

      setCategories((prev) => [...prev, newCategory]);
      toast.success(res.data.message || "added successfully");
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const handleSave = async (id) => {
    try {
      const res =await api.put(`/admin/categories/${id}`, editedCategory);
      toast.success("category update");
      setEditedId(null)
      fetchCategories()
    } catch (err) {
      toast.error("faild update");
    }
    
    
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <button onClick={() => setShowForm(!showForm)}>Add category</button>

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
            const isEditing = editedId === category._id;
            return (
              <tr key={category._id}>
                <td>{index + 1}</td>

                <td>
                  {isEditing ? (
                    <input
                      name="name"
                      value={editedCategory.name}
                      onChange={(e) =>
                        setEditedCategory({
                          ...editedCategory,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    category.name
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      name="description"
                      value={editedCategory.description}
                      onChange={(e) =>
                        setEditedCategory({
                          ...editedCategory,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    category.description
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <>
                      <button onClick={() => handleSave(category._id)}>
                        save
                      </button>
                      <button>cancel</button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditedId(category._id);
                          setEditedCategory({
                            name: category.name,
                            description: category.description,
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
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
        <form onSubmit={handleAddCategory}>
          <input
            type="text"
            name="name"
            id="name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            required
            placeholder="name"
          />

          <input
            type="tesxt"
            name="description"
            id="description"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
            required
            placeholder="description"
          />

          <button type="submit">Add</button>
        </form>
      )}
    </>
  );
}

export default DisplayCategories;
