import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    if (!token)
      return res
        .status(401)
        .json({ message: "Debe enviar el token de autenticación" });

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = await Usuario.findById(decoded.id).select(
      "-password -createdAt -updatedAt -__v"
    );

    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({ error: "Hubo un error en la validación del token" });
  }
};

export default checkAuth;
