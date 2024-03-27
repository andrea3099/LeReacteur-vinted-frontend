import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Offer from "./pages/Offer";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Header></Header>
      {isLoading ? (
        <p>Je charge</p>
      ) : (
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/offer/:id" element={<Offer data={data} />} />
          <Route path="*" element={<p>Error 404</p>} />
        </Routes>
      )}
      <Footer></Footer>
    </Router>
  );
}

export default App;
