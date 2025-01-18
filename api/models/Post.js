import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    cuerpo: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      required: true,
      trim: true,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
    },
    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
