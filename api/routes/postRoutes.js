import express from "express";
import {
  crearPost,
  obtenerPosts,
  obtenerPost,
  editarPost,
  eliminarPost,
  obtenerUltimosPostsPopulares,
  obtenerPostsRecientes,
  obtenerPostsCategoria,
} from "../controllers/postController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/populares").get(obtenerUltimosPostsPopulares);
router.route("/recientes").get(obtenerPostsRecientes);
router.route("/categoria").get(obtenerPostsCategoria);

// router.route("/").post(checkAuth, crearPost).get(obtenerPosts);
router.route("/").post(crearPost).get(obtenerPosts);
router.route("/:postId").get(obtenerPost).put(editarPost).delete(eliminarPost);

// Agrega la ruta para obtener los 3 posts más recientes

export default router;
