import { useState } from "react";
import { useGlobalStates } from "../../Context/GlobalContext";
import { TYPES } from "../../Context/actions/actionsProduct";
import CalendarSearch from "./CalendarSearch";
import "../../styles/buscador.css";
import "../../index.css";
import CitySearch from "./CitySearch";
//Consumiendo la api con el useFetch y le puse un alert para que avise que necesita seleccionar una ciudad o una fecha a la espera de la api de productos para filtrar por fecha
const Buscador = () => {
  const { providerValue } = useGlobalStates();
  const { dispatchProduct, endDate, setEndDate, startDate, setStartDate } =
    providerValue;
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const getSelectedCity = (valueCity) => {
    setSelectedCity(valueCity);
  };

  const handleSearch = (id) => {
    if (id) {
      dispatchProduct({
        type: TYPES.PRODUCT_LOCATION,
        payload: id,
      });
      //setSelectedOption(null);
    } else {
      alert("Seleccione una ciudad o una fecha para buscar");
    }
  };

  return (
    <div className="seccionBuscador">
      <div className="tituloBuscador">
        <h1>Busca ofertas en hoteles, casas y mucho más</h1>
      </div>
      <div className="cuerpoBuscador">
        <CitySearch
          getSelectedCity={getSelectedCity}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <CalendarSearch
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <button id="btnBuscar" onClick={() => handleSearch(selectedCity.id)}>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default Buscador;
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
