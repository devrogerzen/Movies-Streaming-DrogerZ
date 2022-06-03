import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Detalle = () => {
  let token = sessionStorage.getItem("token");

  //todo lo que viaja despues del signo ?
  let query = new URLSearchParams(window.location.search);
  let movieID = query.get("movieID");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=451528a3fcaba4c98d6c198eb2d074de&language=es-ES`;
    axios
      .get(endPoint)
      .then((response) => {
        const movieData = response.data;
        setMovie(movieData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieID]);

  return (
    <>
      {!token && <Navigate to="/" />}
      {!movie && <p>Cargando...</p>}
      {movie && (
        <>
          <h2>Titulo: {movie.title}</h2>
          <div className="row m-0">
            <div className="col-4">
              <img
                className="img-fluid my-2"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="Poster Movies"
              />
            </div>

            <div className="col-8">
              <h5>Fecha de estreno: {movie.release_date}</h5>
              <h5>Reseña:</h5>
              <p>{movie.overview}</p>
              <h5>Rating: {movie.vote_average}</h5>
              <h5>Genero</h5>
              <ul>
                {movie.genres.map((oneGenre) => (
                  <li key={oneGenre}>{oneGenre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detalle;