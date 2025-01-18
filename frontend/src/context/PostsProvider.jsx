import { createContext, useState } from "react";
import axios from "axios";

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [postsPopulares, setPostsPopulares] = useState([]);
  const [postsRecientes, setPostsRecientes] = useState([]);
  const [postCategoriaCulturaOtaku, setPostCategoriaCulturaOtaku] = useState(
    []
  );
  const [postCategoriaJapon, setPostCategoriaJapon] = useState([]);

  const obtenerPostsPopulares = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/populares`
      );
      setPostsPopulares(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerPostsRecientes = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/recientes`
      );
      setPostsRecientes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerPostsCategoriaCulturaOtaku = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/posts/categoria?categoria=cultura-otaku`
      );
      setPostCategoriaCulturaOtaku(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerPostsCategoriaJapon = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/categoria?categoria=japon`
      );
      setPostCategoriaJapon(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerPost = async (postId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const crearPost = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmZiYmJiOWNiMjM1ZjNiYTBjZTBhNCIsImlhdCI6MTcwNzA2NDUzMCwiZXhwIjoxNzA5NjU2NTMwfQ.2cuj5-iRXJmr8QSVCqNgh19bMoB0g85DDc_y1djAVWA`,
      },
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        data,
        config
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPostImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/uploads`,
      formData
    );
    return res.data;
  };

  const eliminarPost = async (id) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/posts/${id}`
    );
    console.log(res);
  };

  const editarPost = async (data, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmZiYmJiOWNiMjM1ZjNiYTBjZTBhNCIsImlhdCI6MTcwNzA2NDUzMCwiZXhwIjoxNzA5NjU2NTMwfQ.2cuj5-iRXJmr8QSVCqNgh19bMoB0g85DDc_y1djAVWA`,
      },
    };
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/posts/${id}`,
        data,
        config
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        obtenerPostsPopulares,
        postsPopulares,
        obtenerPostsRecientes,
        postsRecientes,
        obtenerPostsCategoriaCulturaOtaku,
        postCategoriaCulturaOtaku,
        obtenerPostsCategoriaJapon,
        postCategoriaJapon,
        obtenerPost,
        crearPost,
        uploadPostImg,
        eliminarPost,
        editarPost
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export { PostsProvider };

export default PostsContext;
