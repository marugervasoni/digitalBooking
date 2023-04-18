import React, { useEffect, useState } from "react";
import { TYPES } from "../../Context/actions/actionsProduct";
import { useGlobalStates } from "../../Context/GlobalContext";
import useFetch from "../../Hooks/useFetch";
import "../../styles/categorias.css";
import "../../index.css";
import category from "../../Utils/category.json";

//Consumiendo la api con el useFetch
const Categorias = () => {
  const { providerValue } = useGlobalStates();
  const { dispatchProduct } = providerValue;
  const [categoryAPI, setCategoryAPI] = useState([]);
  const { data, error, isLoading } = useFetch("/categories/listAll");

  useEffect(() => {
    if (data && data !== categoryAPI) {
      setCategoryAPI(data);
    } else if (error) {
      console.error(error);
    }
    /*setCategoryAPI(category.data);*/
  }, [data, error]);
  const handleCategory = (title) => {
    dispatchProduct({
      type: TYPES.PRODUCT_CATEGORY,
      payload: title,
    });
  };
  return (
    <>
      <div className="seccionCategorias">
        <div className="tituloCategorias">
          <h2>Buscar por tipo de alojamiento</h2>
        </div>
        {isLoading ? (
          <p>Cargando ... </p>
        ) : (
          <div className="categoriasContenedorCards">
            {categoryAPI.map((item) => (
              <div
                id={item.id}
                className="categoriasCards"
                onClick={() => handleCategory(item.title)}
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  width="300"
                  height="200"
                />
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Categorias;
/*
  {
    mode: "cors",
    method: "GET",
    headers: {
      Origin: "http://localhost:5173",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }
  {mode: 'cors',
method: 'GET',
headers: {
    'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'Content-Type': 'application/json',
  }}





  {isLoading ? (
          <p>Cargando ... </p>
        ) : (
          <div className="categoriasContenedorCards">
            {categoryAPI.map((item) => (
              <div
                id={item.id}
                className="categoriasCards"
                onClick={() => handleCategory(item.title)}
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  width="300"
                  height="200"
                />
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
  */
