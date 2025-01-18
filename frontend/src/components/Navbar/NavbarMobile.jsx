import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/somoskudasai.svg";
import Button from "./Button";

export default function NavbarMobile({ open, setOpen }) {
  const wrapperRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  return (
    <nav>
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 bg-black ${
          open ? "opacity-50" : "invisible opacity-0"
        } transition-opacity duration-500 z-10 cursor-pointer`}
        onClick={handleOutsideClick}
      ></div>

      <div
        ref={wrapperRef}
        className={`
          bg-kudasai fixed w-10/12 md:w-2/4 lg:w-1/4 top-0 overflow-y-auto bottom-0 py-10 pl-4 text-white
          duration-500 ${open ? "left-0" : "left-[-100%]"} z-50
        `}
      >
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <img src={Logo} alt="logo" className="md:cursor-pointer h-5" />
            <span
              className="pr-4 text-2xl cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              X
            </span>
          </div>

          <ul className="flex flex-col gap-2">
            <span className="text-kudasaiPrimary text uppercase font-semibold tracking-widest">Temas</span>
            <li className="flex flex-col gap-3">
              <Link to="/posts?categoria=anime" className="px-3 inline-block hover:text-kudasaiSecondary">
                Anime
              </Link>
              <Link to="/" className="px-3 inline-block hover:text-kudasaiSecondary">
                Cultura Otaku
              </Link>
              <Link to="/" className="px-3 inline-block hover:text-kudasaiSecondary">
                Japón
              </Link>
              <Link to="/" className="px-3 inline-block hover:text-kudasaiSecondary">
                Manga
              </Link>
              <Link to="/" className="px-3 inline-block hover:text-kudasaiSecondary">
                Reseñas
              </Link>
              <Link to="/" className="px-3 inline-block hover:text-kudasaiSecondary">
                VideoJuegos
              </Link>

            </li>
          </ul>

          <div className="flex items-center justify-start">
            <Button />
          </div>
        </div>
      </div>
    </nav>
  );
}
