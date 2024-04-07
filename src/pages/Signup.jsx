import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = ({ setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);
  const [data, setData] = useState(null);

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form
        className="signup-form"
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const response = await axios.post(
              ` ${import.meta.env.VITE_API_URL}user/signup`,
              {
                username: `${username}`,
                email: `${email}`,
                password: `${password}`,
                newsletter: `${newsletter}`,
              }
            );

            console.log(response.data);
            setData(response.data);
            Cookies.set("userToken", response.data.token, { expires: 7 });
            setToken(response.data.token);
            navigate("/");
          } catch (error) {
            console.log(error.response);
          }
        }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="checkbox-container">
          <div>
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(event) => {
                setNewsLetter(event.target.checked);
              }}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button type="submit" className="button-log">
          S'inscrire
        </button>
      </form>
      <Link to="/login" className="link">
        <span>Tu as déjà un compte ? Connecte-toi !</span>
      </Link>
    </div>
  );
};
export default Signup;
