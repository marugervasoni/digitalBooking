import React from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import useForm from "../Hooks/useForm";
import productos from "../Utils/productos.json";
import Politicas from "../Components/Product/Politicas";
import { useEffect, useState, useRef } from "react";
import { TYPES } from "../Context/actions/actionsUser";
import { useGlobalStates } from "../Context/GlobalContext";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";
import "../styles/reserva.css";
import "../index.css";
import FormBookingExtras from "../Components/Booking/FormBookingExtras";
import CalendarBooking from "../Components/Booking/CalendarBooking";
import HourBooking from "../Components/Booking/HourBooking";
import { format } from "date-fns";
import { routes } from "./routes";
import TitleComponent from "../Components/TitleComponent";
import Stars from "../Components/Stars";
import useFetch from "../Hooks/useFetch";

const ReservaProducto = () => {
  const { id } = useParams();
  const { providerValue } = useGlobalStates();
  const {
    idProducto,
    endDate,
    setEndDate,
    startDate,
    setStartDate,
    stateUser,
    emailjsVar,
    productoReserva,
    setProductoReserva,
  } = providerValue;
  const navigate = useNavigate();
  const [hour, setHour] = useState();
  const [booking, setBooking] = useState();
  const [updateUser, setUpdateUser] = useState();
  const [emailSent, setEmailSent] = useState(false);
  const [producto, setProducto] = useState();
  //const producto = productos.find((producto) => producto.id === id.toString());
  const idNumerico = parseInt(id);
  const { data, error, isLoading } = useFetch(`/products/search/${idNumerico}`);
  useEffect(() => {
    if (data) {
      setProducto(data);
    } else if (error) {
      console.error(error);
    }
  }, [data, error]);
  const fechaStartDate = new Date(startDate);
  const fechaStartDateFormateada = format(fechaStartDate, "dd/MM/yyyy");

  const fechaEndDate = new Date(endDate);

  const fechaEndDateFormateada = format(fechaEndDate, "dd/MM/yyyy");
  console.log(producto);
  console.log(startDate);

  const initialValues = {
    name: stateUser.infoUser.name,
    lastName: stateUser.infoUser.lastName,
    email: stateUser.infoUser.email,
    city: "",
    isVaccinated: false,
    message: "",
  };
  const validate = (values) => {
    const errorsBooking = {};
    if (!values.city) {
      errorsBooking.city = "Es obligatorio indicar la ciudad";
    }
    if (startDate === null && endDate === null) {
      errorsBooking.calendar =
        "Es obligatorio indicar una fecha de inicio y final de reserva";
    }
    if (!hour) {
      errorsBooking.hour = "Es obligatorio seleccionar un horario de llegada";
    }
    return errorsBooking;
  };
  const onSubmit = async (values, setErrors) => {
    /*Acá iría un put para actualizar la info del usuario*/
    setUpdateUser({ city: values.city });
    /*y un post para reservar*/
    setBooking({
      checkIn: fechaStartDateFormateada,
      CheckOut: fechaEndDateFormateada,
      Message: values.message,
      hour: hour,
      isVaccinated: values.isVaccinated,
    });

    navigate(routes.reservaExitosa);
  };

  console.log(updateUser);
  console.log(booking);
  console.log(fechaEndDateFormateada);
  console.log(startDate);
  console.log(endDate);
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate,
    onSubmit
  );

  return (
    <>
      {isLoading ? (
        <div>Cargando ... </div>
      ) : producto === undefined ? (
        <div> Cargando ... </div>
      ) : (
        <>
          <TitleComponent
            category={producto.category.title}
            title={producto.name}
            route={`/producto/${id}`}
          />

          <h2 className="reservaTitulo">Completá tus datos</h2>
          <div className="bloquePrincipal">
            <div className="bloqueIzquierda">
              <FormBookingExtras
                name={values.name}
                lastName={values.lastName}
                email={values.email}
                city={values.city}
                isVaccinated={values.isVaccinated}
                message={values.message}
                handleChange={handleChange}
                errors={
                  errors.city && (
                    <p className="mensajeForm-reserva">{errors.city}</p>
                  )
                }
              />
              <div className="segundoBloque">
                <h2 className="reservaSegundoTitulo">
                  Selecciona tu fecha de reserva
                </h2>
                <div className="calendar-container-booking">
                  <CalendarBooking />
                  {errors.calendar && (
                    <p className="mensajeForm-reserva-calendar">
                      {errors.calendar}
                    </p>
                  )}
                </div>
                <h2 className="reservaSegundoTitulo">Tu horario de llegada</h2>
                <HourBooking
                  setHour={setHour}
                  errors={
                    errors.hour && (
                      <p className="mensajeForm-reserva">{errors.hour}</p>
                    )
                  }
                />
              </div>
            </div>
            <div className="detalleReserva">
              <div className="container-tablet">
                <h2 className="detalleTitulo">Detalle de reserva</h2>
                <img
                  src={producto.images[0].url}
                  alt={producto.name}
                  className="img-productoReserva"
                />
              </div>
              <div className="container-tablet2">
                <h2 className="categoryReserva">{producto.category.title}</h2>
                <h2>{producto.name}</h2>
                <Stars />
                <div className="reserva-direccion">
                  <img
                    width="10"
                    height="15"
                    src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/pinLocationSelect.png"
                    alt="dirección"
                  />
                  <span>{producto.city.name}</span>
                </div>
                <hr />
                <div className="reserva-checkin">
                  <span>Check in</span>
                  {startDate ? (
                    <span>{fechaStartDateFormateada}</span>
                  ) : (
                    <span>___/___/____</span>
                  )}
                </div>
                <hr />
                <div className="reserva-checkin">
                  <span>Check out</span>
                  {endDate ? (
                    <span>{fechaEndDateFormateada}</span>
                  ) : (
                    <span>___/___/____</span>
                  )}
                </div>
                <hr />
                <button onClick={handleSubmit} id="confirm-reserva">
                  Confirmar Reserva
                </button>
              </div>
            </div>
          </div>

          <div className="productoTexto">
            <h2>Que tenes que saber</h2>
            <hr />
            <Politicas
              politicaTitle1={producto.policies[0].title}
              politicaTitle2={producto.policies[1].title}
              politicaTitle3={producto.policies[2].title}
              politicaDescription1={producto.policies[0].description}
              politicaDescription2={producto.policies[1].description}
              politicaDescription3={producto.policies[2].description}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ReservaProducto;
/*
 <form>
            <div className="formFila">
              <div>
                <label id="name" form="name">
                  Nombre
                </label>
                <input
                  value={values.name}
                  type="text"
                  id="name"
                  name="name"
                  readOnly
                />
              </div>
              <div>
                <label id="lastName" form="lastName">
                  Apellido
                </label>
                <input
                  value={values.lastName}
                  type="text"
                  name="lastName"
                  id="lastName"
                  readOnly
                />
              </div>
            </div>
            <div className="formFila">
              <div>
                <label id="email" form="email">
                  Correo Electrónico
                </label>
                <input
                  value={values.email}
                  type="email"
                  name="email"
                  id="email"
                  readOnly
                />
              </div>
              <div>
                <label id="ciudad" form="ciudad">
                  Ciudad
                </label>
                <input
                  value={values.ciudad}
                  type="ciudad"
                  name="ciudad"
                  id="passciudadword"
                />
              </div>
            </div>
          </form>


           <p>Indica tu horario estimado de llegada</p>
        <select
          id="selectorHorario"
          className="selectorHorario"
          placeholder="Horario de llegada"
        >
          {horarios.map((horario) => (
            <option value={horario.id} key={horario.id}>
              {horario.value}
            </option>
          ))}
        </select>
*/
/*

useEffect(() => {
    const enviarCorreo = async (templateParams) => {
      try {
        const response = await emailjs.send(
          emailjsVar.SERVICE_ID,
          emailjsVar.TEMPLATE_ID_BOOKING,
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

    if (updateUser && !emailSent && booking) {
      const templateParams = {
        name: stateUser.infoUser.name,
        email: stateUser.infoUser.email,
        checkIn: fechaStartDateFormateada,
        checkOut: fechaEndDateFormateada,
        message: values.message,
        hour: hour,
        direccion: producto.city.name,
        alojamiento: producto.name,
      };
      enviarCorreo(templateParams);
    }
  }, [updateUser, emailSent, booking]);*/
