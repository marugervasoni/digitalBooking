import React from "react";
import { TYPES } from "../Context//actions/actionsUser";
import { useGlobalStates } from "../Context/GlobalContext";
import TitleComponent from "../Components/TitleComponent";
import { routes } from "./routes";
import "../styles/recomendaciones.css";
import "../index.css";
import "../styles/confirmacion.css";
import Recomendados from "../Components/Home/Recomendados";
import { Link } from "react-router-dom";
//Idealmente guardar la info en la api, pero sino mejorar el reducer para guardar la info del usuario mejor en el local storage
const Favoritos = () => {
  const { providerValue } = useGlobalStates();
  const { stateUser, dispatchUser, loading, setLoading } = providerValue;
  console.log(stateUser.infoUser.favUser.length);
  console.log(stateUser.infoUser.favUser);
  return (
    <div>
      <TitleComponent title="Mis Favoritos" route={routes.home} />
      {stateUser.infoUser.favUser.length === 0 ? (
        <div className="confirmacion-container-userFB">
          <div className="card-container">
            <img
              src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/notElement.png"
              alt="No hay favoritos guardados"
            />
            <h4 className="confirmacion-text">
              Aún no has guardado ningún favorito
            </h4>
            <Link to={routes.home}>
              <button id="btnNoFavs" className="botonPrimario botonSecundario">
                OK
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="userFavBooking-container">
          <Recomendados
            loading={loading}
            setLoading={setLoading}
            product={stateUser.infoUser.favUser}
          />
        </div>
      )}
    </div>
  );
};

export default Favoritos;
