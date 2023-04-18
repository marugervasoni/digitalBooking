import React from "react";
import "../../styles/producto.css";
import "../../index.css";

const Politicas = ({
  politicaTitle1,
  politicaTitle2,
  politicaTitle3,
  politicaDescription1,
  politicaDescription2,
  politicaDescription3,
}) => {
  return (
    <div className="grillaPoliticas">
      <div className="normas">
        <h3>{politicaTitle1}</h3>
        <p>{politicaDescription1}</p>
      </div>
      <div className="seguridad">
        <h3>{politicaTitle2}</h3>
        <p>{politicaDescription2}</p>
      </div>
      <div className="cancelacion">
        <h3>{politicaTitle3}</h3>
        <p>{politicaDescription3}</p>
      </div>
    </div>
  );
};

export default Politicas;
