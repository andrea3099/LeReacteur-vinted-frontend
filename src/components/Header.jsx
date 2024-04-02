import logo from "../assets/img/logo-vinted.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
const Header = ({ token, setToken }) => {
  return (
    <div className="header-container">
      <Link to="/">
        <div className="logo-vinted">
          <img src={logo} alt="logo-vinted" />
        </div>
      </Link>
      <div className="search-container">
        <input type="text" placeholder="Recherche des articles" />
        <FontAwesomeIcon icon={"magnifying-glass"} className="icon-search" />
      </div>
      {token ? (
        <div>
          <button
            className="button-logout"
            onClick={() => {
              Cookies.remove("userToken");
              setToken(null);
            }}
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <div>
          <Link to="/signup">
            <button className="header-button signup-login">S'inscrire</button>
          </Link>
          <Link to="/login">
            <button className="header-button signup-login">Se connecter</button>
          </Link>
        </div>
      )}
      <Link to={token ? "/publish" : "/login"}>
        <button className="header-button button-article">
          Vends tes articles
        </button>
      </Link>
    </div>
  );
};
export default Header;
