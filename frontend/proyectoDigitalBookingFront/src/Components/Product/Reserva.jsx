import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { useGlobalStates } from "../../Context/GlobalContext";
import { routes } from "../../Routes/routes";
import { useNavigate } from "react-router-dom";
import "../../styles/producto.css";
import "../../index.css";

registerLocale("es", es);
//Modificaciones ya está hecho el tema de que el botón te lleve al login y al registro.
const useSetIdProducto = (id) => {
  const { providerValue } = useGlobalStates();
  const { setIdProducto } = providerValue;
  useEffect(() => {
    setIdProducto(id);
  }, [setIdProducto, id]);
};
const Reserva = ({ id, producto }) => {
  const { providerValue } = useGlobalStates();
  const {
    idProducto,
    endDate,
    setEndDate,
    startDate,
    setStartDate,
    stateUser,
    productoReserva,
    setProductoReserva,
  } = providerValue;
  const navigate = useNavigate();
  const [monthsShown, setMonthsShown] = useState(2);
  useSetIdProducto(id);

  const onChangeCalendar = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleBooking = () => {
    //Preguntarle a Maru el caso de prueba si la persona puede seleccionar la fecha o sólo es para ver los días disponibles
    setProductoReserva(producto);
    stateUser.log === true
      ? navigate(`/producto/${id}/reserva`)
      : navigate(`${routes.login}?from=/producto/${id}`);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setMonthsShown(1);
      } else {
        setMonthsShown(2);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="contenedor-principal-reserva">
      <div className="calendario-booking">
        <DatePicker
          className="calendario-booking"
          placeholderText="Check in - Check out"
          calendarStartDay={0}
          useWeekdaysShort
          onChange={onChangeCalendar}
          minDate={new Date()}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={monthsShown}
          fixedHeight
          dateFormat="dd/MM/yyyy"
          locale={es}
          inline
          /*excludeDates= "a la espera del formato del back"*/
        ></DatePicker>
      </div>
      <div className="bloque-reserva">
        <h4>Agregá tus fechas de viaje para obtener precios exactos</h4>
        <button id="btnIniciarReserva" onClick={handleBooking}>
          Iniciar Reserva
        </button>
      </div>
    </div>
  );
};

export default Reserva;
/*
A futuro para saber como deshabilitar fechas en base a lo que me envía la api
<DatePicker
  // propiedades existentes
  excludeDates={disabledDates}
>
const disabledDates = [
  {
    startDate: new Date(2023, 2, 10),
    endDate: new Date(2023, 2, 15),
  },
  {
    startDate: new Date(2023, 3, 1),
    endDate: new Date(2023, 3, 5),
  },
];



*/
