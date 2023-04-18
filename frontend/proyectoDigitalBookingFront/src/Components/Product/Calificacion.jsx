import React from "react";
import "../../styles/producto.css";
import "../../index.css";
import Stars from "../Stars";

const Calificacion = () => {
  return (
    <div className="calification-container">
      <div>
        <p className="valoracion">Muy bueno</p>
        <Stars />
      </div>
      <h2 className="nota">8</h2>
    </div>
  );
};

export default Calificacion;
