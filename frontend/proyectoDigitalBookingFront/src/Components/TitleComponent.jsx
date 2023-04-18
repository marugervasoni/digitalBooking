import React from "react";
import { Link } from "react-router-dom";
import "../styles/producto.css";
import "../index.css";

const TitleComponent = ({ category, title, route }) => {
  return (
    <div className="productoHeader">
      {" "}
      <div className="productoTitulo">
        {category && <p>{category}</p>}
        <h1>{title}</h1>
      </div>
      <Link to={route}>
        <img
          src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/back.png"
          alt="Volver"
        />
      </Link>
    </div>
  );
};

export default TitleComponent;
