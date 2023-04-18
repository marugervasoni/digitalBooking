import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGlobalStates } from "../Context/GlobalContext";
import { routes } from "../Routes/routes";
import { TYPES } from "../Context/actions/actionsUser";
import "../styles/confirmacion.css";

const CuentaConfirmada = () => {
  const { id, fromReservation } = useParams();
  const { providerValue } = useGlobalStates();
  const { stateUser, idProducto, dispatchUser } = providerValue;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fromParam = queryParams.get("from");
  console.log(useParams());
  useEffect(() => {
    const userValidate = stateUser.users.find((u) => u.idGenerate === id);
    console.log(userValidate);
    console.log(id);
    if (userValidate) {
      dispatchUser({
        type: TYPES.VERIFIED_USER,
        payload: id,
      });
      //Acá se tiene que hacer el fetch y la información que trae la guardo en el dispatch TYPES.LOG_USER
      dispatchUser({
        type: TYPES.LOG_USER,
        payload: userValidate,
      });
    }
    setTimeout(() => {
      if (fromParam) {
        navigate(`/producto/${idProducto.id}/reserva`);
      } else {
        navigate(routes.home);
      }
    }, 3000);
  }, [id]);

  return (
    <div className="confirmacion-container">
      <div className="card-container">
        <img src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Atomo+check.png" />
        <h2 className="confirmacion-text">
          ¡Muchas Gracias por confirmar tu cuenta!
        </h2>
        <h4>"En unos segundos serás redirigido/a . . .</h4>
      </div>
    </div>
  );
};

export default CuentaConfirmada;
