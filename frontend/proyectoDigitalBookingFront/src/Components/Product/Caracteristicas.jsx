import React from "react";
import "../../styles/producto.css";
import "../../index.css";

const Caracteristicas = ({ caracteristicas }) => {
  return (
    <>
      {caracteristicas.map((item) => (
        <div className="atributo-caracteristica" key={item.id}>
          <img width="20" height="20" src={item.icon} alt={item.name} />
          <p>{item.name}</p>
        </div>
      ))}
    </>
  );
};

export default Caracteristicas;
