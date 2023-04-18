import React from "react";
import { Link } from "react-router-dom";
import { useGlobalStates } from "../Context/GlobalContext";
import { routes } from "./routes";
import TitleComponent from "../Components/TitleComponent";
import "../styles/confirmacion.css";

const ReservasUser = () => {
  const { providerValue } = useGlobalStates();
  const { stateUser, dispatchUser, loading, setLoading } = providerValue;
  //Acá cambiar fav por reservas idealmente consumir la api desde el reducer
  return (
    <div>
      <TitleComponent title="Mis Reservas" route={routes.home} />
      {stateUser.infoUser.booking.length === 0 ? (
        <div className="confirmacion-container-userFB">
          <div className="card-container">
            <img
              src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/notElement.png"
              alt="No hay reservas"
            />
            <h4 className="confirmacion-text">
              Aún no has efectuado ninguna reserva
            </h4>
            <Link to={routes.home}>
              <button
                id="btnNoReservas"
                className="botonPrimario botonSecundario"
              >
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
            product={stateUser.favs}
          />
        </div>
      )}
    </div>
  );
};

export default ReservasUser;
