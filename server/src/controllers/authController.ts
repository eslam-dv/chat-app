import cloudinary from "../config/cloudinary";
import UserModel from "../models/userModle";
import AppError from "../utils/AppError";
import catchError from "../utils/catchError";
import { signToken } from "../utils/jwt";

const register = catchError(async (req, res) => {
  const { email, fullName, password, profilePic } = req.body;

  if (!email || !fullName || !password) {
    throw new AppError(400, "All fields are required");
  }

  if (password.length < 6) {
    throw new AppError(400, "Password must be atleast 6 characters long");
  }

  const user = await UserModel.findOne({ email });
  if (user) throw new AppError(400, "email already in use");

  let imageUrl;
  if (profilePic) {
    const uploadResource = await cloudinary.uploader.upload(profilePic);
    imageUrl = uploadResource.secure_url;
  }

  const newUser = await UserModel.create({
    email,
    fullName,
    password,
    profilePic: imageUrl,
  });

  signToken(newUser.id, res);

  res
    .status(201)
    .json({ message: "user registerd successfullly!", user: newUser });
});

const login = catchError(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(400, "All fields are required");
  }

  const user = await UserModel.findOne({ email });
  if (!user) throw new AppError(404, "Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new AppError(404, "Invalid credentials");

  signToken(user.id, res);

  res.status(200).json({ message: "logged in successfully!", user });
});

const logout = catchError(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "logged out successfully!" });
});

const updateProfile = catchError(async (req, res) => {
  const { email, fullName, profilePic } = req.body;
  const userId = req.user.id;

  const user = await UserModel.findById(userId);
  if (!user) throw new AppError(404, "User not found");

  if (email) user.email = email;
  if (fullName) user.fullName = fullName;
  if (profilePic) {
    const uploadResource = await cloudinary.uploader.upload(profilePic);
    user.profilePic = uploadResource.secure_url;
  }

  const updatedUser = await user.save();

  res
    .status(200)
    .json({ message: "user updated successfully!", user: updatedUser });
});

const checkAuth = catchError(async (req, res) => {
  res.status(200).json({ user: req.user });
});

export { register, login, logout, updateProfile, checkAuth };
