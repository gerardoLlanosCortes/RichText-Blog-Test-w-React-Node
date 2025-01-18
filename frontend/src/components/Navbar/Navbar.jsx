import React, { useState, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import NavLinks from "./NavLinks";
import Button from "./Button";
import Logo from "../../assets/somoskudasai.svg";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-kudasai py-5">
        <div className="flex items-center font-medium justify-around gap-5">
          <div className="p-0 w-auto flex gap-3">
            <div
              className="text-3xl px-3 rounded bg-kudasaiSecondary text-white cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              X
            </div>
            <Link to={"/"}>
              <img src={Logo} alt="logo" className="md:cursor-pointer h-9" />
            </Link>
          </div>
          <div className="flex-1 p-5 md:p-0">
            <input
              className="w-full py-2 px-3 bg-kudasaiDark text-white text-sm focus:outline-none rounded"
              type="search"
              placeholder="Noticias Anime, mangas, reviews..."
            />
          </div>

          <div className="md:block hidden">
            <Button />
          </div>
        </div>
      </nav>

      <NavbarMobile open={open} setOpen={setOpen} />

      <Outlet />
    </>
  );
}
