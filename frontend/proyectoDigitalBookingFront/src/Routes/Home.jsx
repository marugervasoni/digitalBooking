import React from "react";
import Buscador from "../Components/Home/Buscador";
import Categorias from "../Components/Home/Categorias";
import Recomendados from "../Components/Home/Recomendados";
import { useGlobalStates } from "../Context/GlobalContext";
import "../styles/recomendaciones.css";

const Home = () => {
  const { providerValue } = useGlobalStates();
  const {
    loading,
    setLoading,
    stateProduct,
    stateNewProduct,
    dispatchNewProduct,
    initialProducts,
  } = providerValue;

  return (
    <>
      <Buscador />
      <Categorias />
      <div className="recomendacionesTitulo">
        <h2>Recomendaciones</h2>
      </div>
      <Recomendados
        loading={loading}
        setLoading={setLoading}
        product={initialProducts}
      />
    </>
  );
};

export default Home;
