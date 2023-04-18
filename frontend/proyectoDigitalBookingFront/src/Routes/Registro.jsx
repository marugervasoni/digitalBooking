import React, { useEffect, useState } from "react";
import FormRegistro from "../Components/FormRegistro";
import { Link, useLocation } from "react-router-dom";
import { routes } from "./routes";
import { useGlobalStates } from "../Context/GlobalContext";
//Modificaciones para que sepa si viene de producto y el cartel de que hay que registrarse
const Registro = () => {
  const { providerValue } = useGlobalStates();
  const { idProducto } = providerValue;
  const [fromReservation, setFromReservation] = useState(false);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const fromParam = queryParams.get("from");
  useEffect(() => {
    if (fromParam) {
      setFromReservation(true);
    }
  }, [location.search]);
  return (
    <>
      <div className="login">
        {fromReservation && (
          <div className="warningRegistro">
            <img
              src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/atomo+warning.png"
              alt="Atención"
            ></img>
            <p>
              El login es obligatorio para reservar este producto. Si no estás
              registrado, por favor regístrate primero.
            </p>
          </div>
        )}{" "}
        <h2>Crear cuenta</h2>
        <FormRegistro />
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link
            to={{
              pathname: routes.login,
              search: fromParam ? `?from=/producto/${idProducto.id}` : "",
            }}
          >
            <span className="registrate">Iniciar sesión</span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Registro;
