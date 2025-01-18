import React from "react";
import Imagen from "../../assets/makima.jpg";
import Moment from "react-moment";
import "moment/locale/es";
import { useNavigate } from "react-router-dom";

export default function RecentImage({ post }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const title = encodeURIComponent(
      post.titulo
        .normalize("NFD") // Normaliza los caracteres a su forma compuesta
        .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos
        .toLowerCase() // Convierte a minúsculas
        .replace(/[^\w\s-]/g, "") // Elimina caracteres especiales excepto guiones y espacios
        .replace(/\s+/g, "-") // Reemplaza espacios con guiones
    );
    navigate(`/noticias/${title}`, { state: { postId: post._id } });
  };

  return (
    <div
      className="contenedor w-full h-64 relative cursor-pointer shadow"
      onClick={handleNavigate}
    >
      <figure className="h-full relative figure">
        <div className="gradient-overlay "></div>
        <img
          src={post.img}
          alt=""
          className="w-full h-full object-cover rounded"
        />
      </figure>
      <article className="absolute inset-0 flex flex-col justify-end gap-2 text-white p-4">
        <span className="bg-kudasai w-fit py-1 px-2 text-[8px] rounded font-bold uppercase">
          {post.categoria}
        </span>
        <h1 className=" font-bold">{post.titulo}</h1>
        <p className="text-xs">
          <Moment fromNow locale="es">
            {post.createdAt}
          </Moment>
        </p>
      </article>
    </div>
  );
}
