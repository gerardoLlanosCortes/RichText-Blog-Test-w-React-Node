import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";

export const register = async (req, res) => {
  const { nombre, email, password, img } = req.body;

  if (!nombre || !email || !password) {
    return res.status(404).json({ msg: "Todos los campos son obligatorios" });
  }

  try {
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(409).json({ msg: "El usuario ya existe!" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      img,
    });
    res.status(200).json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.status(404).json({ msg: "Todos los campos son obligatorios" });
  }

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ msg: "El usuario no existe" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, usuario.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "La contraseña es incorrecta" });
    }

    res.status(200).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
