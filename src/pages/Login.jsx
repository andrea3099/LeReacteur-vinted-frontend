import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);

  return (
    <div className="signup-container">
      <h2>Se connecter</h2>
      <form
        className="signup-form"
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}user/login`,
              {
                email: `${email}`,
                password: `${password}`,
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
          setToken(data.token);
        }}
      >
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Adresse email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button type="submit" className="button-log">
          Se connecter
        </button>
      </form>
      <Link to="/signup" className="link">
        <span>Pas encore de compte ? Inscris-toi !</span>
      </Link>
    </div>
  );
};
export default Login;
