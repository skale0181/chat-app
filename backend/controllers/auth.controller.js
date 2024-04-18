import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password don't match" });
    }

    const user = await User.findOne({ username }); //check user present or not

    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }

    //hash the password
    const sault = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, sault);

    //create predefined avatar for user
    const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`; //female
    const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`; //male

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? maleAvatar : femaleAvatar,
    });

    if (newUser) {
      //generate jwt token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(500).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error("error in signup", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    ); //compare password
    if (!user || !isPasswordCorrect) {
     return res.status(400).json({ error: "Invalid user username or password" });
    }

    generateTokenAndSetCookie(user._id, res); //generate token and store to cookie

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("error in login", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
 try {
  res.cookie('jwt', "", {maxAge: 0})
  res.status(200).json({message: "Logged out successfully"})
 } catch (error) {
  console.error("error in login", error.message);
  res.status(500).json({ error: error.message });
 }
};
