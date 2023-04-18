import React, { useEffect, useState } from "react";
import "../../../styles/administracion.css";
import categorias from "../../../Utils/category.json";
import useFetch from "../../../Hooks/useFetch";
const SelectCategory = ({
  getSelectedValue,
  placeHolder,
  selectedOptionCategory,
  setSelectedOptionCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState();
  const { data, error, isLoading } = useFetch("/categories/listAll");
  /*
  useEffect(() => {
    setCategory(categorias.data);
  }, [categorias]);*/

  useEffect(() => {
    if (data && data !== category) {
      setCategory(data);
    } else if (error) {
      console.error(error);
    }
    /*setCategoryAPI(category.data);*/
  }, [data, error]);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value, valueId) => () => {
    setSelectedOptionCategory(value);
    setIsOpen(false);
    getSelectedValue(valueId);
  };

  const selectText = selectedOptionCategory
    ? selectedOptionCategory
    : placeHolder;
  return (
    <div className="selectBox-admin">
      <div className="dropDownHeader-admin" onClick={toggling}>
        <div className="costumSelectContent-admin">
          <p
            className={
              selectedOptionCategory
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
          {category.map((option) => (
            <li
              className="optionContent-admin"
              onClick={onOptionClicked(option.title, option.id)}
              key={option.id}
              id="Option"
            >
              <h2 className="title-admin">{option.title}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectCategory;
