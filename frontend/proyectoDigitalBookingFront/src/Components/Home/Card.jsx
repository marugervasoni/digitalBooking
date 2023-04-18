import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TYPES } from "../../Context/actions/actionsUser";
import { useGlobalStates } from "../../Context/GlobalContext";
import Stars from "../Stars";
import "../../styles/card.css";
import "../../index.css";
import "../../styles/producto.css";
import InteraccionMobile from "../Product/InteraccionMobile";

//Maru lo pedís, lo tenés ahora la descripción tiene el más...
const Card = ({
  id,
  img,
  category,
  title,
  location,
  description,
  producto,
}) => {
  const { providerValue } = useGlobalStates();
  const { stateUser, dispatchUser } = providerValue;
  const [descriptionCard, setDescriptionCard] = useState("");
  const [isFav, setIsFav] = useState(
    stateUser.favs?.find((i) => i.id === id) !== undefined
  );

  const addFav = () => {
    dispatchUser({
      type: TYPES.ADD_FAV_USER,
      payloadEmail: stateUser.infoUser.email,
      payloadFav: producto,
    });
    setIsFav(true);
  };

  const removeFav = () => {
    dispatchUser({
      type: TYPES.REMOVE_FAV_USER,
      payloadEmail: stateUser.infoUser.email,
      payloadFavId: id,
    });
    setIsFav(false);
  };

  const handleFavClick = () => {
    if (isFav) {
      removeFav();
    } else {
      addFav();
    }
  };
  const descriptionHandle = () => {
    if (window.innerWidth < 768) {
      description?.length > 200
        ? setDescriptionCard(
            <p>
              {" "}
              {description.substring(0, 200)}...{" "}
              <Link key={id} to={`/producto/${id}`}>
                <span id="masDescriptionMobile">más info</span>{" "}
              </Link>
            </p>
          )
        : setDescriptionCard(<p>{description}</p>);
    } else {
      description?.length > 120
        ? setDescriptionCard(
            <p>
              {" "}
              {description.substring(0, 120)}...{" "}
              <Link key={id} to={`/producto/${id}`}>
                <span id="masDescription">mas info</span>{" "}
              </Link>
            </p>
          )
        : setDescriptionCard(<p>{description}</p>);
    }
  };

  useEffect(() => {
    descriptionHandle();
    window.addEventListener("resize", { descriptionCard });
    return () => {
      window.removeEventListener("resize", { descriptionCard });
    };
  }, [description]);
  const textScore = (rating) => {
    let text =
      rating >= 0 && rating <= 2.5
        ? "Muy Malo"
        : rating >= 2.6 && rating <= 5
        ? "Malo"
        : rating >= 5.1 && rating <= 6.5
        ? "Regular"
        : rating >= 6.6 && rating <= 8
        ? "Bueno"
        : "Muy bueno";
    return text;
  };
  console.log(producto.features);
  return (
    <div className="card" id={id}>
      <div className="imgCard">
        <img className="imagen-card" src={img} alt={title} />
        <div className="corazon">
          {stateUser.log === false ? (
            <img
              className="like-card"
              width="19"
              height="19"
              src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/corazon-blanco-vacio.png"
              alt="Me gusta"
            />
          ) : (
            <img
              className="like-card"
              onClick={handleFavClick}
              width="20"
              height="20"
              src={
                isFav
                  ? "https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/favorito-1.png"
                  : "https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/corazon-blanco-vacio.png"
              }
              alt="Me gusta"
            />
          )}
        </div>
      </div>
      <div className="informacionCard">
        <div className="title-card">
          <div className="title-left">
            <div className="primer-title">
              <p>{category.toUpperCase()}</p>
              <Stars />
            </div>
            <h2>{title}</h2>
          </div>
          <div className="valoración-container">
            <h2 className="nota-card">8</h2>
            <p className="valoracion-card">Muy bueno</p>
          </div>
        </div>
        <div className="mostrar-map">
          <img
            src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/pinLocationSelect.png"
            alt="Ubicación"
          />
          <p>
            A 940 m del centro <span>MOSTRAR EN EL MAPA</span>
          </p>
        </div>
        <div className="caracteristica-card">
          {producto.features.map((feature) => (
            <img key={feature.id} src={feature.icon} alt={feature.name} />
          ))}
        </div>
        <div className="descripcion-card">{descriptionCard}</div>

        <Link key={id} to={`/producto/${id}`}>
          <button id="btnVerMas" className="botonSecundario botonPrimario">
            Ver Mas
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
/* 
valoración {averageScore ? averageScore : 1}

{products.length === 0 ? (
            <p className={style.msgNoProducts}>
              Lamentablemente no hay productos para los filtros seleccionados.
            </p>
          ) : (
*/
