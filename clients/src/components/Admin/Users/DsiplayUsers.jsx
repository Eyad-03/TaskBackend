import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";

function DisplayUsers() {
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
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
                <td>{user.role}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default DisplayUsers;