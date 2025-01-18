import React, { useEffect } from "react";
import Main from "../components/Home/Main";
import Recents from "../components/Home/Recents";
import CategoryInfo from "../components/Home/CategoryInfo";
import usePosts from "../hooks/usePosts";

export default function Home() {
  const {
    obtenerPostsPopulares,
    obtenerPostsRecientes,
    obtenerPostsCategoriaCulturaOtaku,
    obtenerPostsCategoriaJapon,
  } = usePosts();

  useEffect(() => {
    const obtenerPosts = async () => {
      try {
        await Promise.all([
          obtenerPostsPopulares(),
          obtenerPostsRecientes(),
          obtenerPostsCategoriaCulturaOtaku(),
          obtenerPostsCategoriaJapon(),
        ]);
      } catch (error) {
        console.error("Ocurrió un error al obtener los posts:", error);
      }
    };

    obtenerPosts();
  }, []);

  return (
    <div className="flex flex-col text-white gap-32">
      <Main />
      <Recents />
      <CategoryInfo categoria={"cultura-otaku"}/>
      <CategoryInfo categoria={"japon"}/>
    </div>
  );
}
