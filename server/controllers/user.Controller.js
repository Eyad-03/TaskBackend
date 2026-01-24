import User from "../models/users.Models.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get user by id
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userToDelete = await User.findByIdAndDelete(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const userToUpdate = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: userToUpdate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { newRole } = req.body;

  try {
    const roleToUpdate = await User.findByIdAndUpdate(
      id,
      { role: newRole },
      { new: true }
    );
    if (!roleToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "role update success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};