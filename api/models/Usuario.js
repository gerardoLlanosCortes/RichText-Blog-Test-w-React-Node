import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
