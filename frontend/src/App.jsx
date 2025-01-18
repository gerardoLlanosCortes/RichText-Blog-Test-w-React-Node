import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";

import { PostsProvider } from "./context/PostsProvider";
import Noticia from "./pages/Noticia";
import EscribirNoticia from "./pages/EscribirNoticia";

function App() {
  return (
    <BrowserRouter>
      <PostsProvider>
        <div className="w-10/12 lg:max-w-screen-lg my-0 mx-auto">
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="/noticias/:noticiaId" element={<Noticia />} />
              <Route path="/noticias/nueva" element={<EscribirNoticia />} />
              <Route path="/noticias/nueva" element={<EscribirNoticia />} />
              <Route path="/noticias/editar/:noticiaId" element={<EscribirNoticia />} />
            </Route>
          </Routes>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </PostsProvider>
    </BrowserRouter>
  );
}

export default App;
