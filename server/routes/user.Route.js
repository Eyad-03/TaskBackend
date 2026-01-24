import {
  deleteUser,
  getAllUsers,
  updateUser,
  getUserById,
  updateUserRole
} from "../controllers/user.Controller.js";
import express from "express";
import { protect } from "../middleware/auth.Middleware.js";
import { adminOnly } from "../middleware/admin.Middleware.js";

const router = express.Router();

router.get("/admin/get-users", protect, adminOnly, getAllUsers);

router.get("/user/:id", protect, getUserById);

router.put("/user/:id", protect, updateUser);

router.put("/user/role/:id", protect, updateUserRole);

router.delete("/user/:id", protect, deleteUser);

export default router;