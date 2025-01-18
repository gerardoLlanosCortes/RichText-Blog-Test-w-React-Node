import React from "react";
import { Link } from "react-router-dom";
import CategoryInfoImage from "./CategoryInfoImage";
import CategoryInfoImageGrid from "./CategoryInfoImageGird";
import Imagen from "../../assets/makima.jpg";
import usePosts from "../../hooks/usePosts";

export default function CategoryInfo({ categoria }) {
  let posts = [];
  const { postCategoriaCulturaOtaku, postCategoriaJapon } = usePosts();

  if (categoria === "cultura-otaku") {
    posts = postCategoriaCulturaOtaku;
  } else {
    posts = postCategoriaJapon;
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <h1 className="text-4xl font-bold">
            {categoria === "cultura-otaku" ? "Cultura Otaku" : "Japón"}
          </h1>
          <Link className="flex items-end">Ver más</Link>
        </div>
        <p className="text-kudasaiText opacity-55 text-sm order-1">
          {categoria === "cultura-otaku"
            ? "¡CONOCE LAS ÚLTIMAS TENDENCIAS SOBRE JAPÓN Y LA INDUSTRIA OTAKU!"
            : "¡LO MÁS DIVERTIDO, EXTRAÑO E INTRIGANTE DEL PAÍS NIPÓN!"}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 relative">
        <div className="col-span-2 row-span-2">
          <CategoryInfoImage lassName="col-span-2 row-span-2" post={posts[0]} />
        </div>
        {posts.slice(1).map((post) => (
          <div key={post._id} className="col-span-1 row-span-1">
            <CategoryInfoImageGrid post={post} />
          </div>
        ))}
        <figure className="absolute top-0 right-0 h-full -z-10 w-2/4">
          <div className="relative rounded-2xl -mt-24">
            <img
              className=" rounded-2xl h-[500px] object-cover"
              src={posts[0]?.img}
              alt=""
            />
            <div className=" rounded-2xl gradient-overlay--bg"></div>
          </div>
        </figure>
      </div>
    </div>
  );
}
