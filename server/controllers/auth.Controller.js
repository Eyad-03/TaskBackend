import user from "../models/users.Models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register logic
export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await user.findOne({ email });

    //confirmation password check
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists, Try to login" });
    }
    //check if password length more than 8 chars
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    //check if password contains at least one number and one special character
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/; //regex

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one number and one special character",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10); //salt rounds

    const newUser = user.create({ name, email, password: hashPassword, role: "user" });

    return res
      .status(201)
      .json({ message: "User registered successfully", newUser });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
};

//login logic with jwt
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await user.findOne({ email }); //name, email, password, role

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found, Please register" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "email or password are incorrect, please try again" });
    }
    //generate jwt token
    //token is the key to get in and go
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //false in development
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    return res
      .status(200)
      .json({ message: "Login successful", user: existingUser, token });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
};


//get current user
export const getCurrentUser = async (req, res) => {
  //get current user from the id in tokens
  try {
    const currentUser = await user.findById(req.user.id).select("-password");
    console.log("Current User:", currentUser); //debugging line
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ currentUser });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}
//logout
export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logout successful" });
};

