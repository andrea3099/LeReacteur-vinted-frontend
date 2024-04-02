import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import { useState } from "react";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  return (
    <Router>
      <Header token={token} setToken={setToken}></Header>
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/offer/:id" element={<Offer token={token} />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
        <Route path="*" element={<p>Error 404</p>} />
      </Routes>
    </Router>
  );
}

export default App;
