import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { TYPES } from "../Context/actions/actionsUser";
import { useGlobalStates } from "../Context/GlobalContext";
import useForm from "../Hooks/useForm";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";
import "../styles/login.css";
import "../index.css";

//Falta modificar para usar la api
//Agregue también lo de guardar los favoritos dentro del bloque de usuarios
//Voy a intentar de hacer la validación desde el front
//voy a instalar npm install @emailjs/browser --save para el email
//instalé npm install uuid para generar un id único para validar el email
//Agrego el campo de isVerified y ciudad para actualizarlo despues
//Harcodeo un id a la espera de un milagro y que funcione el backend

const FormRegistro = () => {
  const { providerValue } = useGlobalStates();
  const { stateUser, dispatchUser, idProducto, emailjsVar } = providerValue;
  const [urlForm, setUrlForm] = useState();
  const [emailSent, setEmailSent] = useState(false);
  const [userID, setUserID] = useState();
  const location = useLocation(null);
  const queryParams = new URLSearchParams(location.search);
  const fromParam = queryParams.get("from");
  const [emailUser, setEmailUser] = useState();
  const [nameUser, setNameUser] = useState();

  const generateTemporalID = () => {
    const ID = uuidv4();
    return ID;
  };
  console.log(userID);
  console.log(urlForm);
  const initialValues = {
    name: "",
    lastName: "",
    email: "",
    ciudad: "",
    password: "",
    confirmPassword: "",
    favUser: [],
    isVerified: false,
    idGenerate: userID,
    admin: false,
    id: 1,
    booking: [],
  };
  const validate = (values) => {
    const errorsRegister = {};
    if (!values.name) {
      errorsRegister.name = "Este campo es obligatorio";
    } else if (!fullNameRegex.test(values.name)) {
      errorsRegister.name = "El nombre no acepta caracteres";
    }
    if (!values.lastName) {
      errorsRegister.lastName = "Este campo es obligatorio";
    } else if (!fullNameRegex.test(values.lastName)) {
      errorsRegister.lastName = "El apellido no acepta caracteres";
    }
    if (!values.email) {
      errorsRegister.email = "Este campo es obligatorio";
    } else if (!emailRegex.test(values.email)) {
      errorsRegister.email = "El email no es válido";
    }
    if (!values.password) {
      errorsRegister.password = "Este campo es obligatorio";
    } else if (values.password.length <= 5) {
      errorsRegister.password =
        "La contraseña debe tener al menos 6 caracteres";
    }
    if (!values.confirmPassword) {
      errorsRegister.confirmPassword = "Este campo es obligatorio";
    } else if (values.confirmPassword !== values.password) {
      errorsRegister.confirmPassword = "Las contraseñas no coinciden";
    }

    return errorsRegister;
  };
  const fullNameRegex =
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const onSubmit = async (values, setErrors) => {
    if (stateUser.users.find((u) => u.email === values.email)) {
      setErrors({
        existingUser: "El usuario que quiere crear ya existe",
      });
    } else if (stateUser.users.find((u) => u.isVerified === false)) {
      setErrors({
        existingUser: `Usted ya comenzó el proceso de registro, por favor ingrese al link que se le envio para confirmar su cuenta.`,
      });
    } else {
      setEmailUser(values.email);
      setNameUser(values.name);
      const generatedID = generateTemporalID();
      setUserID(generatedID);
      const userObject = {
        ...values,
        idGenerate: generatedID,
      };
      dispatchUser({
        type: TYPES.ADD_USERS,
        payload: userObject,
      });
      setEmailSent(false);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate,
    onSubmit
  );

  useEffect(() => {
    const baseUrl = window.location.origin;
    if (userID && fromParam) {
      setUrlForm(
        `${baseUrl}/cuentaConfirmada/${userID}?from=/producto/${idProducto.id}`
      );
    } else if (userID) {
      setUrlForm(`${baseUrl}/cuentaConfirmada/${userID}`);
    }
  }, [userID, fromParam, idProducto]);

  useEffect(() => {
    const enviarCorreo = async (templateParams) => {
      try {
        const response = await emailjs.send(
          emailjsVar.SERVICE_ID,
          emailjsVar.TEMPLATE_ID_PRUEBA_REGISTRO,
          templateParams,
          emailjsVar.PUBLIC_KEY
        );
        console.log(
          "Correo electrónico enviado con éxito!",
          response.status,
          response.text
        );
        setEmailSent(true);
      } catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
      }
    };

    if (urlForm && !emailSent && nameUser && emailUser) {
      const templateParams = {
        name: nameUser,
        email: emailUser,
        url: urlForm,
      };
      enviarCorreo(templateParams);
      setEmailSent(true);
    }
  }, [urlForm, nameUser, emailUser, emailSent]);

  console.log(stateUser);
  return (
    <>
      <fieldset className="formLogin">
        <form onSubmit={handleSubmit}>
          <div className="formRegistroNombres">
            <div>
              <label id="name" form="name">
                Nombre
              </label>
              <input
                className={
                  errors.name
                    ? "input-login-registro-nombre-error"
                    : "registroNombre"
                }
                value={values.name}
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                placeholder="Ingrese su nombre"
              />
              {errors.name && <p className="mensajeForm">{errors.name}</p>}
            </div>
            <div>
              <label id="lastName" form="lastName">
                Apellido
              </label>
              <input
                className={
                  errors.lastName
                    ? "input-login-registro-nombre-error"
                    : "registroNombre"
                }
                value={values.lastName}
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleChange}
                placeholder="Ingrese su apellido"
              />
              {errors.lastName && (
                <p className="mensajeForm">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div>
            <label id="email" form="email">
              Correo Electrónico
            </label>
            <input
              className={
                errors.email
                  ? "input-login-registro-error"
                  : "input-login-registro"
              }
              value={values.email}
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="Ingrese su email"
            />
            {errors.email && <p className="mensajeForm">{errors.email}</p>}
          </div>
          <div>
            <label id="password" form="password">
              Contraseña
            </label>
            <input
              className={
                errors.password
                  ? "input-login-registro-error"
                  : "input-login-registro"
              }
              value={values.password}
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
            />
            {errors.password && (
              <p className="mensajeForm">{errors.password}</p>
            )}
          </div>
          <div>
            <label id="confirmPassword" form="confirmPassword">
              Confirme su contraseña
            </label>
            <input
              className={
                errors.confirmPassword
                  ? "input-login-registro-error"
                  : "input-login-registro"
              }
              value={values.confirmPassword}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Ingrese nuevamente su contraseña"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="mensajeForm">{errors.confirmPassword}</p>
            )}
          </div>
          {!emailSent ? (
            <div className="botonLogin">
              <button id="btnCrearCuenta" type="submit">
                Crear Cuenta
              </button>
            </div>
          ) : (
            <div className="botonLogin">
              <button id="btnCrearCuentaDisabled" type="submit" disabled>
                Crear Cuenta
              </button>
              <p className="mensajeForm">
                Se ha enviado un correo electrónico de confirmación a{" "}
                {values.email}. Por favor, confirma tu email para completar el
                registro.
              </p>
            </div>
          )}
          {errors.existingUser && (
            <p className="mensajeForm">{errors.existingUser}</p>
          )}
        </form>
      </fieldset>
    </>
  );
};

export default FormRegistro;
/*
<div className="mensajeForm">
  <p>
    Se ha enviado un correo electrónico de confirmación a {values.email}.
    Por favor, confirma tu email para completar el registro.
  </p>
</div>
Ahora el registro se va a hacer en otro lugar:

dispatchUser({
        type: TYPES.LOG_USER,
        payload: values,
      });
      
      




*/
