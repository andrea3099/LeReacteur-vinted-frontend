import { Link } from "react-router-dom";
const Home = ({ data }) => {
  return (
    <section className="offers-container">
      {data.offers.map((offer, index) => {
        const routeOffer = `/offer/${offer._id}`;
        console.log(routeOffer);
        return (
          <div className="offer-container" key={index}>
            <Link to={routeOffer} className="offer-link">
              <div className="owner-container">
                <img src={offer.owner.account.avatar.secure_url} alt="" />
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
  );
};
export default Home;
