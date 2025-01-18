import React, { useMemo, useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import usePosts from "../hooks/usePosts";
import axios, { toFormData } from "axios";
import { useParams } from "react-router-dom";

export default function EscribirNoticia() {
  const params = useParams();
  const [id, setId] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const quillRef = useRef(null);
  const { obtenerPost, crearPost, uploadPostImg } = usePosts();

  useEffect(() => {
    const obtenerNoticia = async () => {
      if (params.noticiaId) {
        const data = await obtenerPost(params.noticiaId);
        console.log(data);
        setId(data._id);
        setTitulo(data.titulo);
        setCategoria(data.categoria);
        setCuerpo(data.cuerpo);
        setPreview(data.img);
      }
    };
    obtenerNoticia();
  }, [params.noticiaId]);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(""); // Limpiar vista previa si no hay archivo seleccionado
    }
  }

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async function () {
      const file = input.files[0];
      console.log("User trying to upload this:", file);

      const formattedFileName = Date.now() + "-" + file.name; // Generar el nuevo nombre del archivo
      const modifiedFile = new File([file], formattedFileName, {
        type: file.type,
      }); // Crear un nuevo objeto File con el nuevo nombre

      const link = `http://localhost:4001/uploads/${modifiedFile.name}`;

      const quill = quillRef.current.getEditor();
      const range = quillRef.current.getEditor().getSelection();
      quill.insertEmbed(range.index, "image", link);

      const modifiedName = modifiedFile.name;
      setImageFiles((prev) => [...prev, { path: link, id: modifiedName }]);
      setImagesToUpload((prev) => [...prev, file]);
    };
  };

  useEffect(() => {
    console.log(imagesToUpload);
  }, [imagesToUpload]);

  const deleteImage = async (fileId) => {
    // Si ya existe una noticia, eliminamos la imagen solo del estado y no de la base de datos.
    const filteredImageFiles = imageFiles.filter(
      (image) => image.id !== fileId
    );
    setImageFiles(filteredImageFiles);

    const filteredImagesToUpload = imageFiles.filter((image) => {
      return image.id !== fileId;
    });
    setImagesToUpload(filteredImagesToUpload);

    // } else {
    //   // Si estamos creando una nueva noticia, eliminamos la imagen de la base de datos.
    //   const res = await axios.delete(
    //     `${import.meta.env.VITE_API_URL}/uploads/${fileId}`
    //   );
    //   console.log(res);
    // }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ header: 1 }, { header: 2 }],
          ["blockquote", "code-block", "link", "image", "video"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const formats = useMemo(
    () => [
      "font",
      "size",
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "code-block",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
      "color",
      "background",
      "clean",
      "align",
    ],
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!id) {
        const imgUrl = await uploadPostImg(file);
        const data = {
          titulo,
          cuerpo,
          cuerpoImgs: imagesToUpload,
          img: imgUrl,
          categoria,
        };
        await crearPost(data);
      } else {
        const data = {
          titulo,
          cuerpo,
          categoria,
        };
        await editarPost(data, id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Eliminar imagen si se elimina del cuerpo
  useEffect(() => {
    if (
      quillRef.current?.lastDeltaChangeSet?.ops[1]?.delete === 1 &&
      imageFiles.length > 0
    ) {
      for (let index = 0; index < imageFiles.length; index++) {
        if (!quillRef.current?.value.includes(imageFiles[index].path)) {
          const tempImageFiles = structuredClone(imageFiles);
          const filteredIamgeFiles = tempImageFiles.filter(
            (image) => image.id !== imageFiles[index].id
          );
          deleteImage(imageFiles[index].id);

          setImageFiles(filteredIamgeFiles);
        }
      }
    }
  }, [quillRef.current?.lastDeltaChangeSet?.ops[1]?.delete]);

  return (
    <div className="mt-10 text-white flex gap-8">
      <div className="flex flex-col gap-6 w-9/12">
        <h1 className="text-4xl font-bold">Redactar Noticia</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título de la noticia"
            className="w-full p-2 rounded bg-gray-100 focus:outline-none text-black border-[2px] border-kudasaiDark"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <div className="editorContainer rounded">
            <ReactQuill
              className="editor rounded bg-gray-100 text-black"
              theme="snow"
              ref={quillRef}
              modules={modules}
              formats={formats}
              value={cuerpo}
              onChange={setCuerpo}
            />
          </div>
          <div className="flex justify-between">
            {!id ? (
              <>
                <button className="bg-gray-400 text-center p-2 px-4 rounded">
                  Guardar como borrador
                </button>
                <button
                  type="submit"
                  className="bg-kudasaiSecondary text-center p-2 px-10 rounded"
                >
                  Publicar
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="bg-kudasaiSecondary text-center p-2 px-10 rounded"
              >
                Guardar Cambios
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="flex flex-col w-3/12 gap-6">
        <div className="flex flex-col  gap-3">
          <h1 className="text-xl font-bold">Configuración</h1>
          <div className="flex flex-col gap-3">
            <span>
              <b>Estado: </b> No Guardado
            </span>
            <span>
              <b>Visibilidad: </b> Público
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file"
              className="bg-kudasaiDark text-center p-2 rounded cursor-pointer"
            >
              {!id ? "Subir imágen de portada" : "Cambiar imágen de portada"}
            </label>
            {preview && <img className="img__preview" src={preview} alt="" />}
          </div>
        </div>
        <div className="flex flex-col gap-3  border-[2px] border-kudasaiDark p-3">
          <h1>Categoria</h1>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                name="categoria"
                value="anime"
                id="anime"
                checked={categoria === "anime"}
                onChange={(e) => setCategoria(e.target.value)}
              />
              <label htmlFor="anime">Anime</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                name="categoria"
                value="japon"
                id="japon"
                checked={categoria === "japon"}
                onChange={(e) => setCategoria(e.target.value)}
              />
              <label htmlFor="japon">Japón</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                name="categoria"
                value="cultura-otaku"
                id="cultura-otaku"
                checked={categoria === "cultura-otaku"}
                onChange={(e) => setCategoria(e.target.value)}
              />
              <label htmlFor="cultura-otaku">Cultura Otaku</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                name="categoria"
                value="figuras"
                id="figuras"
                checked={categoria === "figuras"}
                onChange={(e) => setCategoria(e.target.value)}
              />
              <label htmlFor="figuras">Figuras</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
