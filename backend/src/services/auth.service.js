import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (data) => {
  const { name, email, phone, password } = data;

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  const userData = user.toObject();

  delete userData.password;

  const token = generateToken(user._id);

  return {
    user: userData,
    token,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email })
    .select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);

  const userData = user.toObject();
  delete userData.password;

  return {
    user: userData,
    token,
  };
};

export const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};