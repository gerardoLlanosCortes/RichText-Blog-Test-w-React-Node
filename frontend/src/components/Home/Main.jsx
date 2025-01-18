import React from "react";
import MainImage from "./MainImage";
import usePosts from "../../hooks/usePosts";

export default function Main() {
  const { postsPopulares } = usePosts();

  return (
    <main className="mt-10 flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Populares</h1>
        <div className="flex items-center before:content-[''] before:h-[1px] before:grow basis-[0] before:bg-kudasaiText before:opacity-55 before:order-2 before:ml-2 ">
          <p className="text-kudasaiText opacity-55 text-sm order-1">
            LAS NOTICIAS MÁS DESTACADAS DE LA SEMANA
          </p>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        {postsPopulares.map((post) => (
          <MainImage key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
