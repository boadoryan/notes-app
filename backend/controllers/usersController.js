// usersController.js
import { UserModel } from "../models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Register controller
const register = async (req, res) => {
  const { username, password, firstName } = req.body;

  let errors = {};

  if (!firstName) {
    errors.firstName = "First name is required.";
  }
  if (!password) {
    errors.password = "Password is required.";
  }

  if (!username) {
    errors.username = "Username is required.";
  }

  const user = await UserModel.findOne({ username: username });

  if (user) {
    errors.isExistingUser = "This user already exists.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username: username,
    password: hashedPassword,
    firstName: firstName,
  });

  await newUser.save();

  res.json({ message: "User registered successfully" });
};

// Login controller
const login = async (req, res) => {
  const { username, password } = req.body;

  const errors = {};

  if (!username) {
    errors.username = "Username is required.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  const user = await UserModel.findOne({ username: username });

  if (!user) {
    errors.isExistingUser = "User doesn't exist.";
  } else {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      errors.password = "Incorrect password.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: user.username,
        userID: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({
    accessToken,
    userId: user._id,
    expiresIn: 60 * 1000,
    firstName: user.firstName,
  });
};

// Refresh controller
const refresh = (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      try {
        const user = await UserModel.findOne({ username: decoded.username });

        if (!user) return res.status(401).json({ message: "Unauthorized" });

        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: user.username,
              userID: user._id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        res.json({ accessToken, userId: user._id });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  );
};

const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.sendStatus(204);
};

export default { register, login, refresh, logout };
