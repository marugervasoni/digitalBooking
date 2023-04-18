import React, { useState } from "react";
import "../../styles/costumSelect.css";

const CostumSelect = ({ getSelectedValue, mapData, placeHolder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    getSelectedValue(value);
  };

  const selectText = selectedOption ? selectedOption : placeHolder;
  return (
    <div className="selectBox">
      <div className="dropDownHeader" onClick={toggling}>
        <div className="costumSelectContent">
          <p className={selectedOption ? "description" : "initialDescription"}>
            {selectText}
          </p>
          <img src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/select-arrow.png" />
        </div>
      </div>
      {isOpen && (
        <ul className="dropDownList">
          {mapData.map((option) => (
            <li
              className="optionContent"
              onClick={onOptionClicked(option)}
              key={option}
              id="Option"
            >
              <h2 className="title">{option}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CostumSelect;
/*
  useEffect(() => {
    setCitiesAPI(cities.data);
  }, [cities]);
*/
