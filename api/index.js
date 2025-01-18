import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import multer from "multer";
import fs from "fs";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// Configurar cors
const whiteList = [process.env.FRONTEND_URL, "http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      callback(new Error("Error de cors"));
    }
  },
};

app.use(cors(corsOptions));

// MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Mantener el nombre original del archivo
  },
});

const upload = multer({ storage });

// ROUTES
app.post("/api/uploads", upload.single("file"), function (req, res) {
  console.log(req.file);
  const file = req.file;
  res.status(200).json(file.filename);
});
// Ruta para eliminar una imagen
app.delete("/api/uploads/:filename", function (req, res) {
  const filename = req.params.filename;
  const filePath = `./uploads/${filename}`;

  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("El archivo no existe");
      return res.status(404).json({ error: "El archivo no existe" });
    }

    // Eliminar el archivo
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error al eliminar el archivo", err);
        return res.status(500).json({ error: "Error al eliminar el archivo" });
      }
      console.log("Archivo eliminado correctamente");
      res.status(200).json({ message: "Archivo eliminado correctamente" });
    });
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Archivos estaticos de uploads
app.use("/uploads", express.static("uploads"));

// server
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log("😎 Servidor Conectado en el puerto:", PORT);
});
