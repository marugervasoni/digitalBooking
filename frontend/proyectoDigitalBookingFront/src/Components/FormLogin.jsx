import React from "react";
import useForm from "../Hooks/useForm";
import { useGlobalStates } from "../Context/GlobalContext";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../Routes/routes";
import { TYPES } from "../Context/actions/actionsUser";
import "../styles/login.css";
import "../index.css";
//modificaciones: utilizar el nuevo useForm a la espera de la api
const FormLogin = () => {
  const { providerValue } = useGlobalStates();
  const { stateUser, idProducto, dispatchUser } = providerValue;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fromParam = queryParams.get("from");

  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errorsLog = {};
    if (!values.email) {
      errorsLog.email = "Este campo es obligatorio";
    } else if (!emailRegex.test(values.email)) {
      errorsLog.email = "El email no es válido";
    }
    if (!values.password) {
      errorsLog.password = "Este campo es obligatorio";
    } else if (values.password.length <= 5) {
      errorsLog.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return errorsLog;
  };

  const onSubmit = async (values, setErrors) => {
    const user = stateUser.users.find((u) => u.email === values.email);
    if (user && user.password === values.password) {
      if (user.isVerified === false) {
        setErrors({
          login:
            "Necesita confirmar su cuenta ingresando a la url que se encuentra en el mail enviado cuando creo su cuenta.",
        });
      } else {
        if (fromParam) {
          navigate(`/producto/${idProducto.id}/reserva`);
        } else {
          navigate(routes.home);
        }
        dispatchUser({
          type: TYPES.LOG_USER,
          payload: user,
        });
      }
    } else {
      setErrors({
        login: "Por favor vuelva a intentarlo, sus credenciales son inválidas",
      });
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate,
    onSubmit
  );
  console.log(stateUser);
  console.log(stateUser.log);
  return (
    <>
      <fieldset className="formLogin">
        <form onSubmit={handleSubmit}>
          <div>
            <label form="email">Correo Electrónico</label>
            <input
              className={
                errors.email
                  ? "input-login-registro-error"
                  : "input-login-registro"
              }
              placeholder="Ingrese su correo electrónico"
              value={values.email}
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
            />
            {errors.email && <p className="mensajeForm">{errors.email}</p>}
          </div>
          <div>
            <label form="password">Contraseña</label>
            <input
              className={
                errors.password
                  ? "input-login-registro-error"
                  : "input-login-registro"
              }
              placeholder="Ingrese su contraseña"
              value={values.password}
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="mensajeForm">{errors.password}</p>
            )}
          </div>
          <div className="botonLogin">
            <button id="btnLogin" type="submit">
              Ingresar
            </button>
            {errors.login && <p className="mensajeForm">{errors.login}</p>}
          </div>
        </form>
      </fieldset>
    </>
  );
};

export default FormLogin;
