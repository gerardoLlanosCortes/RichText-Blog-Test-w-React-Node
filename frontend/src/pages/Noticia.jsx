import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import usePosts from "../hooks/usePosts";
import { formatearFecha } from "../helpers/formatearFecha";
import DOMPurify from "dompurify";

export default function Noticia() {
  const location = useLocation();
  const { obtenerPost, eliminarPost } = usePosts(); // Importa la función eliminarPost de tu hook usePosts
  const [post, setPost] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerNoticia = async () => {
      const postId = location.state.postId;
      setPost(await obtenerPost(postId));
    };

    obtenerNoticia();
  }, [location]);

  const handleEliminar = async () => {
    try {
      await eliminarPost(post._id);
      // Redireccionar a la página de inicio o a donde sea después de eliminar
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar la noticia", error);
    }
  };

  const handleEditar = async () =>{
    navigate(`/noticias/editar/${post?._id}`)
  }

  console.log(post);

  return (
    <>
      {post && (
        <div className="flex flex-col gap-6">
          <div className="text-white pt-40 pb-24 relative flex flex-col gap-4">
            <span className="bg-kudasaiDark w-fit py-1 px-2 rounded font-bold uppercase">
              {post?.categoria}
            </span>
            <h1 className="text-5xl font-bold w-8/12 leading-[1.3]">
              {post?.titulo}
            </h1>

            <div className="flex gap-4 items-center ">
              <p className="text-gray-300 text-lg">{post?.creadoPor.nombre}</p>
              <p className="text-lg">{formatearFecha(post?.createdAt)}</p>
              <div className="flex gap-2">
                <button onClick={handleEditar}>Editar</button>
                <button onClick={handleEliminar}>Eliminar</button>{" "}
                {/* Llama a la función handleEliminar al hacer clic */}
              </div>
            </div>

            <figure className="absolute top-0 left-auto right-0 -z-10 w-9/12 h-full">
              <img
                src={post?.img}
                alt=""
                className="w-full h-full block object-cover"
              />
              <span className="gradient-overlay--bg"></span>
            </figure>
          </div>

          <article className="notica__cuerpo">
            <p
              className="text-kudasaiPrimary text-2xl leading-relaxed text-justify flex flex-col gap-5"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post?.cuerpo),
              }}
            ></p>
          </article>
        </div>
      )}
    </>
  );
}
