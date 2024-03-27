import { useParams } from "react-router-dom";

const Offer = ({ data }) => {
  const { id } = useParams();
  return (
    <div>
      {data.offers.map((offer) => {
        return (
          <div key={offer._id} className="info-offer-container">
            {offer._id === id && (
              <div>
                <div className="offer-picture">
                  <img src={offer.product_image.secure_url} alt="" />
                </div>
                <div className="offer-infos">
                  <div>
                    <span>{offer.product_price}</span>
                    <ul>
                      {offer.product_details.map((details, index) => {
                        console.log(offer);
                        return (
                          <li key={index}>
                            <span>{Object.keys(details)} </span>
                            <span>{Object.values(details)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="offer-content">
                    <p>{offer.product_name}</p>
                    <p>{offer.product_description}</p>
                    <div>
                      <img src={offer.owner.account.avatar.secure_url} alt="" />
                      <p>{offer.owner.account.username}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Offer;
