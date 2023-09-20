import mongoose from "mongoose";

// Define the Post schema
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    userPicturePath: String,
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      of: Object,
    },
  },
  { timestamps: true }
);

// Create the Post model
const Post = mongoose.model("Post", postSchema);

export default Post;
