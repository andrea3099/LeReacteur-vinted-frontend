import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
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
    <div>
      <div key={data._id} className="info-offer-container">
        <div>
          <div className="offer-picture">
            <img src={data.product_image.secure_url} alt="" />
          </div>
          <div className="offer-infos">
            <div>
              <span>{data.product_price}</span>
              <ul>
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
              <p>{data.product_name}</p>
              <p>{data.product_description}</p>
              <div>
                <img src={data.owner.account.avatar.secure_url} alt="" />
                <p>{data.owner.account.username}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Offer;
