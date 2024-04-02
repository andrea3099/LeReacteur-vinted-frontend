import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Publish = ({ token, ownerId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("descirption", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}offer/publish`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return token ? (
    <main className="main-publish">
      <div className="div-publish">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <div className="publish-picture ">
            {picture && (
              <div className="container-preview">
                <img
                  className="preview-picture"
                  src={URL.createObjectURL(picture)}
                  alt="produit"
                />
              </div>
            )}
            <div className="container-picture">
              <div className="container-ajout-picture">
                <label htmlFor="file" className="label-picture">
                  <span>+</span>
                  <span>Ajoute une photo</span>
                </label>
                <input
                  type="file"
                  id="file"
                  className="input-picture"
                  onChange={(event) => {
                    setPicture(event.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="publish-title publish-offer">
            <div className="input-text">
              <h4>Titre</h4>
              <input
                type="text"
                placeholder="ex: Chemise Sézane verte"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="input-text">
              <h4>Décris ton article</h4>
              <textarea
                type="text"
                placeholder="ex: porté quelque fois, taille correctement"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-description publish-offer">
            <div className="input-text">
              <h4>Marque</h4>
              <input
                type="text"
                placeholder="ex: Zara"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="input-text">
              <h4>Taille</h4>
              <input
                type="number"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="input-text">
              <h4>Couleur</h4>
              <input
                type="text"
                placeholder="ex: Fushia"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="input-text">
              <h4>Etat</h4>
              <input
                type="text"
                placeholder="Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="input-text">
              <h4>Lieu</h4>
              <input
                type="text"
                placeholder="ex: Paris"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-price publish-offer">
            <div className="input-text">
              <h4>Prix</h4>
              <div className="checkbox-input">
                <input
                  type="number"
                  placeholder="0,00€"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div className="checkbox-input">
                  <input type="checkbox" id="echange" name="echange" />
                  <label htmlFor="echange">
                    Je suis intéressé(e) par les échanges
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="button-publish">
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
