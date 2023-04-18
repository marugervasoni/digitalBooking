import React from "react";
import "../../styles/reserva.css";
import "../../index.css";
//Agregar este componente por las dudas que tengamos las cosas
//Dato importante si decidimos agregar las tareas extras que ya están codeadas hay que modificar la entidad reserva en el back, ya están codeadas en front por las dudas.
//Lo ideal sería que cuando tengamos la pantalla de reserva hacer un solo form para todo, tengo que ver como implementarlo

const FormBookingExtras = ({
  name,
  lastName,
  email,
  city,
  isVaccinated,
  message,
  handleChange,
  errors,
}) => {
  return (
    <div className="divFormReserva">
      <form className="formularioReserva">
        <div className="formFilaReserva">
          <div>
            <label form="name">Nombre</label>
            <input
              className="input-comun"
              value={name}
              type="text"
              id="nameBooking"
              name="nameBooking"
              disabled
            />
          </div>
          <div>
            <label form="lastName">Apellido</label>
            <input
              className=" input-comun"
              value={lastName}
              type="text"
              name="lastNameBooking"
              id="lastNameBooking"
              disabled
            />
          </div>
        </div>
        <div className="formFilaReserva">
          <div>
            <label id="email" form="email">
              Correo Electrónico
            </label>
            <input
              className="input-comun"
              value={email}
              type="email"
              name="email"
              id="email"
              disabled
            />
          </div>
          <div>
            <label form="city">Ciudad</label>
            <input
              value={city}
              type="text"
              name="city"
              id="city"
              required
              onChange={handleChange}
            />
            {errors}
          </div>
        </div>
        <div className="formFilaReserva">
          <div className="checkbox">
            <label form="vaccination">Está vacunado contra el COVID-19</label>
            <input
              value={isVaccinated}
              type="checkbox"
              name="vaccination"
              id="vaccination"
              onChange={handleChange}
            />
          </div>
          <div>
            <label form="mesagge">Datos para el vendedor</label>
            <input
              className="input-texta-reserva"
              value={message}
              type="texatarea"
              name="message"
              id="message"
              cols="30"
              rows="10"
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormBookingExtras;
