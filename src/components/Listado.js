import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import swAlert from '@sweetalert/with-react'

const Listado = ( props ) => {
  let token = sessionStorage.getItem("token");

  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const endPoint = "https://api.themoviedb.org/3/discover/movie?api_key=451528a3fcaba4c98d6c198eb2d074de&language=es-ES&sort_by=popularity.desc&page=1"
    axios.get(endPoint)
    .then (response => {
      const apiData = response.data
      setMoviesList(apiData.results)
    })
    .catch(error => {
      swAlert(<h2>hubo errores, intenta más tarde</h2>)
    })
  }, [setMoviesList]);

  return (
    <>
    {!token && <Navigate replace to='/' /> }
      <div className="bg-secondary row m-0">
      {
      moviesList.map((oneMovie, idx) => {
        return(
          <div className="col-3 mt-4" key={idx}>
          <div className="card my-2">
            <button className="favourite-btn"
            onClick={props.addOrRemoveFromFavs}
            data-movie-id = {oneMovie.id}
            >❤</button>
            <img src={ "https://image.tmdb.org/t/p/w500" + oneMovie.poster_path} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{oneMovie.title.substring(0,30)}...</h5>
              <p className="card-text">{oneMovie.overview.substring(0,100)}...</p>
              <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-success">
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

export default Listado;
