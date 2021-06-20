import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add title"],
      unique: true,
      maxLength: [40, "Title cannot be more than 40 characters"],
    },
    author: { type: String, required: true },
    content: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let Dataset = mongoose.models.post || mongoose.model("post", PostSchema);
export default Dataset;
