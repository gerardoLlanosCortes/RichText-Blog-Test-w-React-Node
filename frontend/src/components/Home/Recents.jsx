import React from "react";
import RecentImage from "./RecentImage";
import { Link } from "react-router-dom";
import usePosts from "../../hooks/usePosts";

export default function Recents() {
  const { postsRecientes } = usePosts();

  return (
    <section className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Noticias Recientes</h1>
        <div className="flex items-center before:content-[''] before:h-[1px] before:grow basis-[0] before:bg-kudasaiText before:opacity-55 before:order-2 before:mx-2 ">
          <p className="text-kudasaiText opacity-55 text-sm order-1">
            LAS ÚLTIMAS NOTICIAS DEL MUNDO ANIME Y MANGA
          </p>
          <Link className=" order-3 bg-none flex gap-1 items-center px-2 p-[1px] text-sm rounded hover:bg-kudasaiSecondary hover:transition-colors">
            <span className=" bg-kudasaiSecondary px-2 py-1 rounded leading-none">
              +
            </span>
            Más Noticias
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {postsRecientes?.map((post) => (
          <RecentImage key={post._id} post={post}/>
        ))}
      </div>
    </section>
  );
}
