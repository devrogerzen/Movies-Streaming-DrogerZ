import { Link } from "react-router-dom";
import Buscador from "./Buscador";

export const Header = (props) => {
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <ul className="nav navbar-nav navbar-brand align-items-center flex-row">
          <li className="nav-item p-2">
            <Link className="navbar-brand nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link className="navbar-brand nav-link" to="/listado">
              Listado
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link className=" navbar-brand nav-link" to="/contacto">
              Contacto
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link className="navbar-brand nav-link" to="/favoritos">
              Favoritos
            </Link>
          </li>
          <li className="nav-item p-2">
            <span>
              {props.favorites.length > 0 && (
                <>Peliculas en Favoritos: {props.favorites.length}</>
              )}
            </span>
          </li>
        </ul>
        <Buscador />
      </nav>
    </header>
  );
};
