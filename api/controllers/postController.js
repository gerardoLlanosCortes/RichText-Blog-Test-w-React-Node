import mongoose from "mongoose";
import Post from "../models/Post.js";
import Usuario from "../models/Usuario.js";
import fs from "fs/promises";

export const crearPost = async (req, res) => {
  const { titulo, cuerpo, img, categoria } = req.body;
  req.body.creadoPor = "678c18d6c1f9871cec7bce45";

  if ((!titulo, !cuerpo, !img, !categoria)) {
    return res.status(404).json({ msg: "Todos los campos son obligatorios" });
  }

  const body = req.body;
  body.img = `http://localhost:4001/uploads/${img}`;

  try {
    const post = await Post.create(req.body);

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const obtenerPosts = async (req, res) => {
  try {
    if (!req.query.categoria) {
      const posts = await Post.find();
      return res.json(posts);
    }

    const posts = await Post.find({ categoria: req.query.categoria });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const obtenerUltimosPostsPopulares = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const obtenerPostsRecientes = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(16);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const obtenerPostsCategoria = async (req, res) => {
  const { categoria } = req.query;
  if (!categoria) {
    return res.status(400).json({ msg: "La categoría es requerida" });
  }

  try {
    const posts = await Post.find({ categoria })
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const obtenerPost = async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ msg: "El ID del post no es válido" });
  }

  try {
    const post = await Post.findById(postId).populate({
      path: "creadoPor",
      select: "nombre img",
    });

    if (!post) {
      return res.status(404).json({ msg: "El post no existe" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const eliminarPost = async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ msg: "El ID del post no es válido" });
  }

  try {
    // Busca el post por ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "El post no existe" });
    }

    const filePath = `./uploads`;

    // Elimina la imagen asociada al post
    // Extraer el nombre del archivo de la URL
    const filename = post.img.split("/").pop();
    await fs.unlink(`${filePath}/${filename}`);

    // Elimina las imágenes incrustadas en el cuerpo del post
    const imagenesEnCuerpo = post.cuerpo.match(/src="(.*?)"/g);
    if (imagenesEnCuerpo && imagenesEnCuerpo.length > 0) {
      await Promise.all(
        imagenesEnCuerpo.map(async (imagen) => {
          const filename = imagen.slice(5, -1).split("/").pop();
          await fs.unlink(`${filePath}/${filename}`);
        })
      );
    } else {
      console.log(
        "No se encontraron imágenes incrustadas en el cuerpo del post."
      );
    }

    // Elimina el post de la base de datos
    await Post.deleteOne({ _id: postId });

    res.status(200).json({ msg: "Post eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const editarPost = async (req, res) => {
  const { postId } = req.params;

  // Verificar si el ID del post es válido
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ msg: "El ID del post no es válido" });
  }

  const { titulo, cuerpo, img, categoria } = req.body;

  try {
    // Verificar si el post existe
    let post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "El post no existe" });
    }

    // Extraer todas las URL de las imágenes del cuerpo actual del post
    const imagenesAnteriores = post.cuerpo.match(/src="(.*?)"/g);

    // Eliminar los archivos correspondientes a las imágenes anteriores de la carpeta de uploads
    if (imagenesAnteriores) {
      const uploadDir = path.join(__dirname, "../uploads");
      imagenesAnteriores.forEach((imagen) => {
        const fileName = imagen
          .match(/src="(.*?)"/)[1]
          .split("/")
          .pop();
        const filePath = path.join(uploadDir, fileName);
        fs.unlinkSync(filePath); // Eliminar archivo
      });
    }

    // Actualizar los campos del post con los valores recibidos en la solicitud
    post.titulo = titulo;
    post.cuerpo = cuerpo;
    post.categoria = categoria;

    // Agregar las nuevas imágenes del cuerpo a la carpeta respectiva

    // Guardar los cambios en la base de datos
    await post.save();

    // Devolver el post actualizado como respuesta
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
