import React, { useState } from "react";
import "../../styles/reserva.css";
import "../../index.css";
import CostumSelect from "./CostumSelect";

//Las horas en el ejemplo están con am y pm pero la tarea dice que sea de 0 a 23
const HourBooking = ({ setHour, errors }) => {
  const [selectedHour, setSelectedHour] = useState();
  const [nextSelectedHour, setNextSelectedHour] = useState();
  const optionsData = [];
  for (let i = 0; i < 24; i++) {
    const hora = i < 10 ? `0${i}` : i;
    const option = `${hora}:00 hs`;

    optionsData.push(option);
  }
  const getSelectedValue = (value) => {
    setSelectedHour(value);
    setHour(value);
    const hour = parseInt(value.split(":")[0]);
    const nextHour = (hour + 1) % 24;
    setNextSelectedHour(nextHour);
  };
  return (
    <div className="llegada">
      <div className="hour-description">
        <img
          src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/ok.png"
          alt="ok"
        ></img>
        {selectedHour ? (
          <h4>
            Tu habitación va a estar lista para el check-in entre las{" "}
            {selectedHour} y las{" "}
            {`${nextSelectedHour < 10 ? "0" : ""}${nextSelectedHour}:00 hs`}.
          </h4>
        ) : (
          <h4>
            Tu habitación va a estar lista para el check-in entre las --:-- hs y
            las --:-- hs.
          </h4>
        )}
      </div>
      <label className="hour-label">Indicá tu hora estimada de llegada</label>
      <div className="selector-container">
        <CostumSelect
          getSelectedValue={getSelectedValue}
          mapData={optionsData}
          placeHolder="Seleccionar hora"
        />
      </div>
      {errors}
    </div>
  );
};

export default HourBooking;
