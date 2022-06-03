import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swAlert from "@sweetalert/with-react";
const Resultados = () => {
  //todo lo que viaja despues del signo ?
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");

  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=451528a3fcaba4c98d6c198eb2d074de&language=es-ES&query=${keyword}`;

    axios
      .get(endPoint)
      .then(response => {
        const moviesArray = response.data.results;

        if(moviesArray.length === 0) {
          swAlert(<h4>Tu busqueda no arrojó resultados</h4>)
        }

        setMoviesResults(moviesArray);
      })
      .catch((error) => console.log(error));
  },[keyword]);

  return (
    <>
      <h2>Buscastes: <em>{keyword}</em></h2>
      {(moviesResults.length === 0) && <h3>No hay resultados</h3>}
      <div className="row">
{
  moviesResults.map((oneMovie, idx) => {
    return (
      <div className="col-4" key={idx}>
        <div className="card my-4">
          <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${oneMovie.poster_path}`} alt="poster" />
          <div>
            <h5 className="card-title">{oneMovie.title.substring(0, 30)}</h5>
            <p className="card-text">{oneMovie.overview.substring(0, 100)}</p>
            <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">
                View detail
              </Link>
          </div>
        </div>
      </div>
    )
  })
}
      </div>
    </>
  );
};

export default Resultados;
