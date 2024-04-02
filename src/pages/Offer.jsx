import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const Offer = ({ token }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <p>Loading..</p>
  ) : (
    <div key={data._id} className="info-offer-container">
      <div className="offer-body-container">
        <div className="offer-picture">
          <img
            src={data.product_image.secure_url}
            alt=""
            className="offer-picture"
          />
        </div>
        <div className="offer-infos">
          <div>
            <span>{data.product_price} €</span>
            <ul className="list-offer">
              {data.product_details.map((details, index) => {
                // console.log(offer);
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
            <p className="name">{data.product_name}</p>
            <p className="description">{data.product_description}</p>
            <div className="offer-avatar">
              {data.owner.account.avatar && (
                <img src={data.owner.account.avatar.secure_url} alt="" />
              )}
              <p>{data.owner.account.username}</p>
            </div>
          </div>
          <Link to={token ? "/payment" : "/login"} state={{ data: data }}>
            <button>Acheter</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Offer;
