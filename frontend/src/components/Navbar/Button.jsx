import React from "react";
import { Link } from "react-router-dom";

export default function Button() {
  return (
    <Link to={"/noticias/nueva"}>
      <button className="bg-kudasaiSecondary text-white px-6 py-2 rounded">
        Iniciar sesión
      </button>
    </Link>
  );
}
