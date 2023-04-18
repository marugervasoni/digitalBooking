import { useLocation, useParams } from "react-router-dom";
import Reserva from "../Components/Product/Reserva";
import productos from "../Utils/productos.json";
import SubTitleProduct from "../Components/Product/SubTitleProduct";
import Calificacion from "../Components/Product/Calificacion";
import Interaccion from "../Components/Product/Interaccion";
import ImageCalleryProduct from "../Components/Product/ImageGalleryProduct";
import Caracteristicas from "../Components/Product/Caracteristicas";
import Politicas from "../Components/Product/Politicas";
import MapProduct from "../Components/Product/MapProduct";
import TitleComponent from "../Components/TitleComponent";
import { routes } from "./routes";
import { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
//Modificaciones le puse como props el id a reserva
//Se agregó el bloque de map

const Producto = () => {
  const { id } = useParams();
  const [mobile, setMobile] = useState(false);
  const [producto, setProducto] = useState();
  const idNumerico = parseInt(id);
  const { data, error, isLoading } = useFetch(`/products/search/${idNumerico}`);
  useEffect(() => {
    if (data) {
      setProducto(data);
    } else if (error) {
      console.error(error);
    }
  }, [data, error]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (producto !== undefined) {
    console.log(producto);
  }
  console.log(id);
  return (
    <>
      {isLoading ? (
        <div>Cargando ... </div>
      ) : producto === undefined ? (
        <div> Cargando ... </div>
      ) : (
        <>
          <TitleComponent
            category={producto.category.title}
            title={producto.name}
            route={routes.home}
          />

          <div className="productoSubtitulo">
            <SubTitleProduct
              ciudad={producto.city.name}
              provincia={producto.city.province}
              pais={producto.city.country}
            />
            <Calificacion />
          </div>
          {mobile ? null : (
            <Interaccion
              id={producto.id}
              producto={producto}
              title={producto.name}
            />
          )}

          <ImageCalleryProduct
            name={producto.name}
            imagenes={producto.images}
            img1={producto.images[0].url}
            img2={producto.images[1].url}
            img3={producto.images[2].url}
            img4={producto.images[3].url}
            img5={producto.images[4].url}
            id={producto.id}
            producto={producto}
          />

          <div className="productoTexto">
            <h2>Alojate en el corazon de {producto.city.name}</h2>
            <p>{producto.description}</p>
          </div>
          <h2 className="productoTexto">¿Dónde vas a estar?</h2>
          <hr />
          <h5
            style={{
              backgroundColor: "white",
              textAlign: "start",
              padding: "1rem",
            }}
          >
            {producto.city.name}, {producto.city.country}
          </h5>
          <div
            style={{
              width: "100%",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <MapProduct
              latitude={producto.latitude}
              longitude={producto.longitude}
              name={producto.name}
            />
          </div>
          <h2 className="productoTexto">¿Qúe ofrece éste lugar?</h2>
          <hr />
          <div className="grillaCaracteristicas">
            <Caracteristicas caracteristicas={producto.features} />
          </div>

          <h2 className="productoTexto">¿Qúe tenés que saber?</h2>
          <hr />
          <div className="productoTexto">
            <Politicas
              politicaTitle1={producto.policies[0].title}
              politicaTitle2={producto.policies[1].title}
              politicaTitle3={producto.policies[2].title}
              politicaDescription1={producto.policies[0].description}
              politicaDescription2={producto.policies[1].description}
              politicaDescription3={producto.policies[2].description}
            />
          </div>
          <h2 className="productoTextoCalendar">Fechas disponibles</h2>
          <Reserva id={producto.id} producto={producto} />
        </>
      )}
    </>
  );
};

export default Producto;
