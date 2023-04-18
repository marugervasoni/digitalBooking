import React, { useEffect, useState } from "react";
import "../../../styles/administracion.css";
import cities from "../../../Utils/cities.json";
import useFetch from "../../../Hooks/useFetch";
const SelectCity = ({
  getSelectedValue,
  placeHolder,
  selectedOptionCity,
  setSelectedOptionCity,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cityData, setCityData] = useState();
  /*
  useEffect(() => {
    setCityData(cities.data);
  }, [cities]);*/

  const { data, error, isLoading } = useFetch("/cities/listAll");

  useEffect(() => {
    if (data && data !== cityData) {
      setCityData(data);
    } else if (error) {
      console.error(error);
    }
  }, [data, error]);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (option) => () => {
    setSelectedOptionCity(`${option.name}, ${option.province}`);
    setIsOpen(false);
    getSelectedValue(option.id);
  };

  const selectText = selectedOptionCity ? selectedOptionCity : placeHolder;
  return (
    <div className="selectBox-admin">
      <div className="dropDownHeader-admin" onClick={toggling}>
        <div className="costumSelectContent-admin">
          <p
            className={
              selectedOptionCity
                ? "description-admin"
                : "initialDescription-admin"
            }
          >
            {selectText}
          </p>
          <img src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/select-arrow.png" />
        </div>
      </div>
      {isOpen && (
        <ul className="dropDownList-admin">
          {cityData.map((option) => (
            <li
              className="optionContent-admin"
              onClick={onOptionClicked(option)}
              key={option.id}
              id="Option"
            >
              <h2 className="title-admin">
                {option.name}, {option.province}
              </h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectCity;
