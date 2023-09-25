import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// LOGIN & REGISTER funtionality //

/*************************** REGISTER USER ***************************/

export const register = async (req, res) => {
  try {
    // Destructure recieved data from front-end FORM
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      friends,
      occupation,
    } = req.body;
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If a user with the same email exists, send a response to the client
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Now create the new User object from above data & hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      location,
      friends,
      occupation,
      viewedProfile: 0,
      impressions: 0,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/********************** LOGGING IN ****************************/

export const login = async (req, res) => {
  try {
    // Destructure frontend form data
    const { email, password } = req.body;

    // check if user exist with the recieved email in MongoDB database
    // Get "user" object from DB
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not Exist!" });

    // if user found then proceed with password verification
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials!" });

    // create token and Sign user objects ID with jwt to send to frontend
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Delete Password from object before sending to frontend
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
