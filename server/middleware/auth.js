import jwt from "jsonwebtoken";

/* TOKEN AUTHORIZATION */
export const verifyToken = async (req, res, next) => {
  try {
    // extract Authorization from recieved data of frontend
    let token = req.header("Authorization");

    // check if token included
    if (!token) {
      return res.status(500).json("Access Denied.");
    }

    // check if token is "Bearer" and then trim to get actual token
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify token using JWT_SECRET key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
};
