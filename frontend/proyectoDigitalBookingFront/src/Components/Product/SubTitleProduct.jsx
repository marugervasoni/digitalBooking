import React from "react";
import "../../styles/producto.css";
import "../../index.css";

const SubTitleProduct = ({ ciudad, provincia, pais }) => {
  return (
    <>
      <div className="ubicacion-container">
        <img
          src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/pinLocationSelect.png"
          alt="Ubicación"
        />
        <p>
          {ciudad}, {provincia}, {pais}
        </p>
      </div>
    </>
  );
};

export default SubTitleProduct;
