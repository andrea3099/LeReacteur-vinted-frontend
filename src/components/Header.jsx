import logo from "../assets/img/logo-vinted.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <div className="header-container">
      <div>
        <img src={logo} alt="logo-vinted" />
      </div>
      <div className="search-container">
        <input type="text" placeholder="Recherche des articles" />
        <FontAwesomeIcon icon={"magnifying-glass"} className="icon-search" />
      </div>
      <div>
        <Link to="/signup">
          <button>S'inscrire</button>
        </Link>
        <button>Se connecter</button>
      </div>
      <button>Vends tes articles</button>
    </div>
  );
};
export default Header;
