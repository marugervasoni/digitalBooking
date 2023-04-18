import React, { useEffect, useState } from "react";
import "../../../styles/administracion.css";
import urlFeature from "../../../Utils/url-features.json";

const SelectFeature = ({
  getSelectedValue,
  placeHolder,
  selectedOptionUrl,
  setSelectedOptionUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [featureData, setFeatureData] = useState([]);

  useEffect(() => {
    setFeatureData(urlFeature.data);
  }, [urlFeature]);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (option) => () => {
    setSelectedOptionUrl(option.url);
    setIsOpen(false);
    getSelectedValue(option.url);
  };

  return (
    <div className="selectBox-admin-icon">
      <div className="dropDownHeader-admin-icon" onClick={toggling}>
        <div className="costumSelectContent-admin-icon">
          {selectedOptionUrl ? (
            <img src={selectedOptionUrl} />
          ) : (
            <p className="initialDescription-admin-icon">{placeHolder}</p>
          )}

          <img src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/select-arrow.png" />
        </div>
      </div>
      {isOpen && (
        <ul className="dropDownList-admin-icon">
          {featureData.map((option) => (
            <li
              className="optionContent-admin-icon"
              onClick={onOptionClicked(option)}
              key={option.id}
              id="Option"
            >
              <img src={option.url} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectFeature;
