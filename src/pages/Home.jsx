import { Link } from "react-router-dom";
import dechirer from "../assets/img/dechirer.svg";
import axios from "axios";
import { useState, useEffect } from "react";
const Home = () => {
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

  return isLoading ? (
    <p>Loading..</p>
  ) : (
    <main>
      <section className="hero-container">
        <img src={dechirer} alt="effet-dechirer" />
        <div>
          <div className="hero-ready">
            <span>Prêt à faire du tri dans vos placards</span>
            <button>Commencer à vendre</button>
          </div>
        </div>
      </section>
      <section className="offers-container">
        {data.offers.map((offer, index) => {
          const routeOffer = `/offer/${offer._id}`;
          return (
            <div className="offer-container" key={index}>
              <Link to={routeOffer} className="offer-link">
                <div className="owner-container">
                  {offer.owner.account.avatar && (
                    <img src={offer.owner.account.avatar.secure_url} alt="" />
                  )}
                  <p>{offer.owner.account.username}</p>
                </div>
                <div>
                  <img src={offer.product_image.secure_url} alt="article" />
                  <div className="info-container">
                    <span>{offer.product_price} €</span>
                    {offer.product_details.map((details, index) => {
                      return (
                        <div key={index}>
                          {details.TAILLE && <span>{details.TAILLE}</span>}
                          {details.MARQUE && <span>{details.MARQUE}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
};
export default Home;
