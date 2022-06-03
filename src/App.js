import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { Header } from "./components/Header";
import Listado from "./components/Listado";
import Detalle from "./components/Detalle";
import Login from "./components/Login";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";
import Contacto from "./components/Contacto";

function App() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []);

const favsMovies = localStorage.getItem('favs')
let tempMoviesInFavs
if(favsMovies === null) {
  tempMoviesInFavs = []
} else {
  tempMoviesInFavs = JSON.parse(favsMovies)
}


  const addOrRemoveFromFavs = (e) => {
    const btn = e.currentTarget
    const parent = btn.parentElement
    const imgURL = parent.querySelector('img').getAttribute('src')
    const title = parent.querySelector('h5').innerText
    const overview = parent.querySelector('p').innerText
    const movieData = {
      imgURL, title, overview, id: btn.dataset.movieId
    }
    let movieIsInArray = tempMoviesInFavs.find(oneMovie => {
      return oneMovie.id === movieData.id
    })
    if(!movieIsInArray) {
      tempMoviesInFavs.push(movieData)
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs))
      setFavorites(tempMoviesInFavs)
      console.log('se agrego la pelicula')
    } else {
      let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
        return oneMovie.id !== movieData.id
      })
      localStorage.setItem('favs', JSON.stringify(moviesLeft))
      setFavorites(moviesLeft)
      console.log('se elimino la pelicula')
    }
  }

  return (
    <>
      <Header favorites={favorites} />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/listado" element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
        <Route path="/detalle" element={<Detalle />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/favoritos" element={<Favoritos favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;