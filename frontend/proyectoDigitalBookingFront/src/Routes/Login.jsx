import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { routes } from "./routes";
import FormLogin from "../Components/FormLogin";
import { useGlobalStates } from "../Context/GlobalContext";

//Modificaciones para que sepa si viene de producto y el cartel de que hay que logearse
const Login = () => {
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
    <div className="login">
      {fromReservation && (
        <div className="warning">
          <img
            src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/atomo+warning.png"
            alt="Atención"
          ></img>
          <p>
            El login es obligatorio para reservar este producto. Si no estás
            registrado, por favor regístrate primero.
          </p>
        </div>
      )}
      <h2>Iniciar sesión</h2>
      <FormLogin />
      <p>
        ¿Aún no tenes cuenta?{" "}
        <Link
          to={{
            pathname: routes.registro,
            search: fromParam ? `?from=/producto/${idProducto.id}` : "",
          }}
        >
          <span className="registrate">Registrate</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
