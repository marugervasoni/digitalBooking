import React from "react";
import "../styles/confirmacion.css";
import { Link } from "react-router-dom";
import { routes } from "./routes";
const ProductoCreado = () => {
  return (
    <div className="confirmacion-container">
      <div className="card-container">
        <img src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Atomo+check.png" />
        <h4 className="confirmacion-text">
          Tu producto se ha creado con éxito
        </h4>
        <Link to={routes.home}>
          <button id="btnReservaExitosa" className="btn-ok">
            Volver
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductoCreado;
