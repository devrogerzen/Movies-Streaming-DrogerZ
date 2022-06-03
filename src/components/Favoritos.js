import React from "react";
import { Navigate } from "react-router-dom";


const Favoritos = (props) => {
  let token = sessionStorage.getItem("token");


  /* const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      console.log(favsArray);
      setFavorites(favsArray);
    }
  }, []); */
  return (
    <>
    {!token && <Navigate replace to='/' />}
      <div className="row bg-secondary m-0">
      <h3 className="m-0 mt-3 px-5 text-white">Estas en Favoritos</h3>
        { !props.favorites.length && <div className="col-12 text-danger">No tienes nada en favoritos</div> }
        {props.favorites.map((oneMovie, idx) => {
          return (
            <div className="col-3" key={idx}>
              <div className="card my-4">
                <button
                  className="favourite-btn"
                  onClick={props.addOrRemoveFromFavs}
                  data-movie-id={oneMovie.id}
                >
                  ❤
                </button>
                <img src={oneMovie.imgURL} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">
                    {oneMovie.title.substring(0, 30)}...
                  </h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 100)}...
                  </p>
                  {/*  <Link
                    to={`/detalle?movieID=${oneMovie.id}`}
                    className="btn btn-primary"
                  >
                    View detail
                  </Link> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Favoritos;
