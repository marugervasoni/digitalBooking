import React, { useEffect, useState } from "react";
import "../../styles/citySearch.css";
import cities from "../../Utils/cities.json";
import useFetch from "../../Hooks/useFetch";

const CitySearch = ({ getSelectedCity, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [citiesAPI, setCitiesAPI] = useState([]);
  const [selectedImage, setSelectedImage] = useState(
    "https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/pinLocationPlaceHolder.png"
  );
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setSelectedImage(
      "https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/pinLocationSelect.png"
    );
    setIsOpen(false);
    getSelectedCity(value);
  };
  const { data, error, isLoading } = useFetch("/cities/listAll");

  useEffect(() => {
    if (data && data !== citiesAPI) {
      setCitiesAPI(data);
    } else if (error) {
      console.error(error);
    }
  }, [data, error]);

  const selectText = selectedOption
    ? `${selectedOption.name}, ${selectedOption.country}`
    : "¿A dónde vamos?";
  return (
    <div className="selectBox-city-search">
      <div className="dropDownHeader-city-search" onClick={toggling}>
        <div className="selectContent-city-search">
          <img src={selectedImage} alt="¿A dónde vamos?" />
          <p
            className={
              selectedOption
                ? "description-city-search"
                : "initialDescription-city-search"
            }
          >
            {selectText}
          </p>
        </div>
      </div>
      {isOpen && (
        <ul className="dropDownList-city-search">
          {citiesAPI.map((option) => (
            <li
              className="optionContent-city-search"
              onClick={onOptionClicked(option)}
              key={option.id}
              id="cityOption"
            >
              <img
                src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/pinLocationOptions.png"
                alt={option.name}
              />
              <div>
                <h2 className="title-city-search">{option.name}</h2>
                <p className="description-city-search">{option.country}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;

/*
  const { data, error } = useFetch("/Cities/listCities");
  useEffect(() => {
    if (data && data.data !== citiesAPI) {
      setCitiesAPI(data.data);
    } else if (error) {
      console.error(error);
    }
  }, [data, error]);*/
