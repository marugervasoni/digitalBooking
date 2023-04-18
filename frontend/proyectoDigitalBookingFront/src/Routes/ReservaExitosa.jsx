import React from "react";
import { Link } from "react-router-dom";
import { routes } from "./routes";
import "../styles/confirmacion.css";

const ReservaExitosa = () => {
  return (
    <div className="confirmacion-container">
      <div className="card-container">
        <img src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Atomo+check.png" />
        <div className="confirmacion-text">
          <h2>¡Muchas Gracias!</h2>
          <h4>Su reserva se ha realizado con éxito</h4>
        </div>
        <Link to={routes.home}>
          <button id="btnReservaExitosa" className="btn-ok">
            OK
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReservaExitosa;
