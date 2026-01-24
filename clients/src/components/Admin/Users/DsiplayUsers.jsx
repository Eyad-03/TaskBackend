import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";

function DisplayUsers() {
  const [users, setUsers] = useState([]);
  const[showForm,setShowForm]=useState(false)
  const [newUser,setNewUser]=useState(
    {
      name:"",
      email:"",
      password:"",
      confirmPassword:""
    }
  )

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/get-users");
      console.log("res userss:", res);
      //check if there is no users
      if (res.data.users.length === 0) {
        toast.error(res.data.message || "No users found");
        return;
      }
      setUsers(res.data.users);
    } catch (err) {
      toast.error("Failed to fetch users");
      console.log(err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const res = await api.delete(`/user/${userId}`);
      if (res.status === 200) {
        //delete from state
      setUsers((prev) => prev.filter((user) => userId !== user._id)); 
      //_id not id 
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to delete user");
      console.log(err);
    }
  };


  const handleUpdateRole = async (userId, newRole) => {
  try {
    const res = await api.put(`/user/role/${userId}`, { newRole });

    // حدّث الحالة بشكل immutably
    setUsers(prev =>
      prev.map(u => (u._id === userId ? { ...u, role: newRole } : u))
    );

    toast.success(res.data.message || "Role updated");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to update role user");
    console.log(err);
  }
};

  
const handleAddUser = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/auth/register", newUser);

    if (res.status !== 201) {
      toast.error(res.data.message);
      return;
    }

    setUsers((prev) => [...prev, newUser]);
    toast.success(res.data.message || "added successfully");
    setShowForm(false);
    fetchUsers();
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Registration failed"
    );
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <button onClick={()=>setShowForm(!showForm)}>
        Add user
      </button>

      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select defaultValue={user.role} onChange={(e)=>handleUpdateRole(user._id,e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

        {showForm && (
          <form onSubmit={handleAddUser}>
            <input
              type="text"
              name="name"
              id="name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
              required
              placeholder="name"
            />

            <input
              type="email"
              name="email"
              id="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
              placeholder="email"
            />

            <input
              type="password"
              name="password"
              id="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
              placeholder="password"
            />

            <input
              type="password"
              name="password"
              id="confirm passworrd"
              value={newUser.confirmPassword}
              onChange={(e) =>
                setNewUser({ ...newUser, confirmPassword: e.target.value })
              }
              required
              placeholder="confirm password"
            />

              <button type="submit">Add</button>
          </form>
        )}
    </>
  );
}

export default DisplayUsers;