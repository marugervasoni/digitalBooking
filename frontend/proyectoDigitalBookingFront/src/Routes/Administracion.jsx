import React, { useEffect, useState } from "react";
import TitleComponent from "../Components/TitleComponent";
import { routes } from "./routes";
import FormCrearProducto from "../Components/Admin/FormCrearProducto";
import "../styles/administracion.css";

const Administracion = () => {
  return (
    <>
      <TitleComponent title="Administración de productos" route={routes.home} />
      <div className="admin">
        <h2 className="creacion-prod">Crear producto</h2>
        <FormCrearProducto />
      </div>
    </>
  );
};

export default Administracion;
