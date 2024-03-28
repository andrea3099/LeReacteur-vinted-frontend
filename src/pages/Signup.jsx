import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);

  Cookies.set("userToken", token);

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form
        className="signup-form"
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/signup",
              {
                username: `${username}`,
                email: `${email}`,
                password: `${password}`,
                newsletter: `${newsletter}`,
              }
            );

            console.log(response.data);
            setData(response.data);
            setToken(response.data.token);
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
        <div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              onChange={() => {
                setNewsLetter(!newsletter);
              }}
              checked={newsletter}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button type="submit" onClick={() => {}}>
          S'inscrire
        </button>
      </form>
    </div>
  );
};
export default Signup;
