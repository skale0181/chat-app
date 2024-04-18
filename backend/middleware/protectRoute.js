import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; //get token from cookie
    //check token present or not
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized- not token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); //verify the token

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorize token" });
    }

    const user = await User.findById(decoded.userId).select("-password"); //find user from db using token provided and return it without password

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user; //add user key and value in the req object from db

    next(); // approve the user by middleware
  } catch (error) {
    console.log("error in protectRout middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
