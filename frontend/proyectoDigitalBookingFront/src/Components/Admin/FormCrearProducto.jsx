import React, { useEffect, useState } from "react";
import { useGlobalStates } from "../../Context/GlobalContext";
import useForm from "../../Hooks/useForm";
import SelectCategory from "./Selects/SelectCategory";
import SelectCity from "./Selects/SelectCity";
import "../../styles/administracion.css";
import features from "../../Utils/features.json";
import SelectFeature from "./Selects/SelectFeature";
import { routes } from "../../Routes/routes";
import { useNavigate } from "react-router-dom";

const FormCrearProducto = () => {
  const { providerValue } = useGlobalStates();
  const { stateUser, dispatchUser, idProducto } = providerValue;
  const navigate = useNavigate();
  const [valueCategory, setValueCategory] = useState();
  const [valueCity, setValueCity] = useState();
  const [valueFeature, setValueFeature] = useState([]);
  const [valueImages, setValueImages] = useState([]);
  const [valuePolicies, setValuePolicies] = useState([
    { title: "Normas de la casa", description: "" },
    { title: "Salud y seguridad", description: "" },
    { title: "Políticas de Cancelación", description: "" },
  ]);
  const [featuresData, setFeaturesData] = useState([]);
  const [selectedOptionCategory, setSelectedOptionCategory] = useState(null);
  const [selectedOptionCity, setSelectedOptionCity] = useState(null);
  const [newFeature, setNewFeature] = useState({ title: "", url: "" });
  const [newImg, setNewImg] = useState({ title: "", url: "" });
  const [selectedOptionUrl, setSelectedOptionUrl] = useState(null);

  const initialValues = {
    nameProduct: "",
    category: valueCategory,
    city: valueCity,
    description: "",
    address: "",
    latitude: "",
    longitude: "",
    images: valueImages,
    features: valueFeature,
    policies: valuePolicies,
  };
  const validate = (values) => {
    const errorsAdmin = {};
    if (!values.nameProduct) {
      errorsAdmin.nameProduct = "Este campo es obligatorio";
    }
    if (!valueCategory) {
      errorsAdmin.category = "Este campo es obligatorio";
    }
    if (!values.address) {
      errorsAdmin.address = "Este campo es obligatorio";
    }
    if (!valueCity) {
      errorsAdmin.city = "Este campo es obligatorio";
    }
    if (!values.latitude) {
      errorsAdmin.latitude = "Este campo es obligatorio";
    }
    if (!values.longitude) {
      errorsAdmin.longitude = "Este campo es obligatorio";
    }
    if (!values.description) {
      errorsAdmin.description = "Este campo es obligatorio";
    }
    if (!valueFeature.length) {
      errorsAdmin.features = "Este campo es obligatorio";
    }

    if (valuePolicies[0].description === "") {
      errorsAdmin.policies1 = "Este campo es obligatorio";
    }
    if (valuePolicies[1].description === "") {
      errorsAdmin.policies2 = "Este campo es obligatorio";
    }
    if (valuePolicies[2].description === "") {
      errorsAdmin.policies3 = "Este campo es obligatorio";
    }
    if (valueImages.length < 5) {
      errorsAdmin.images = "Se necesitan cargar mínimo 5 imágenes";
    }
    if (newFeature.url) {
      errorsAdmin.newFeature =
        "No agregó la nueva característica que quiere crear";
    }
    return errorsAdmin;
  };
  const onSubmit = async (values, setErrors) => {
    setValuePolicies([
      { title: "Normas de la casa", description: "" },
      { title: "Salud y seguridad", description: "" },
      { title: "Políticas de Cancelación", description: "" },
    ]);
    setValueFeature([]);
    setValueImages([]);
    setErrors({});
    setSelectedOptionCategory(null);
    setSelectedOptionCity(null);
    navigate(routes.productoCreado);
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox) => (checkbox.checked = false));
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate,
    onSubmit
  );
  const getSelectedCategory = (value) => {
    setValueCategory(value);
  };
  const getSelectedCity = (value) => {
    setValueCity(value);
  };

  const getValueUrl = (value) => {
    setNewFeature({
      ...newFeature,
      url: value,
    });
  };
  useEffect(() => {
    setFeaturesData(features.data);
  }, [features]);
  const handleFeatureChange = (event) => {
    const { name } = event.target;
    const featureIndex = featuresData.findIndex(
      (feature) => feature.title === name
    );
    const feature = featuresData[featureIndex];
    setValueFeature((prevState) => {
      if (
        prevState.some((selectedFeature) => selectedFeature.id === feature.id)
      ) {
        return prevState.filter(
          (selectedFeature) => selectedFeature.id !== feature.id
        );
      }
      return [...prevState, feature];
    });
  };

  const handleAddNewFeature = () => {
    setValueFeature([...valueFeature, newFeature]);
    setNewFeature({ title: "", url: "" });
    setSelectedOptionUrl(null);
  };

  const handleDeleteNewFeature = (newFeatureDelete) => {
    setValueFeature((prevState) => {
      const indexToDelete = prevState.findIndex(
        (feature) => feature.title === newFeatureDelete
      );
      if (indexToDelete !== -1) {
        const newFeatureState = [...prevState];
        newFeatureState.splice(indexToDelete, 1);
        if (prevState[indexToDelete].id) {
          const checkboxToDelete = document.getElementById(
            prevState[indexToDelete].id
          );
          if (checkboxToDelete) {
            checkboxToDelete.checked = false;
          }
        }
        return newFeatureState;
      }
      return prevState;
    });
  };

  const handleAddNewImg = () => {
    setValueImages([...valueImages, newImg]);
    setNewImg({ title: "", url: "" });
  };

  const handleDeleteNewImg = (newImgDelete) => {
    const newArrayImages = valueImages.filter(
      (img) => img.url !== newImgDelete
    );
    setValueImages(newArrayImages);
  };
  console.log(newFeature);
  return (
    <fieldset className="form-container-admin">
      <form onSubmit={handleSubmit}>
        <div className="section-container-input-admin">
          <div className="input-container-admin">
            <label id="nameProduct" form="nameProduct">
              Nombre producto
            </label>
            <input
              className="input-comun-admin"
              value={values.nameProduct}
              type="text"
              id="nameProduct"
              name="nameProduct"
              placeholder="Nombre del producto"
              onChange={handleChange}
            />
            {errors.nameProduct && (
              <p className="mensajeForm-admin">{errors.nameProduct}</p>
            )}
          </div>
          <div className="select-container">
            <label>Categoria</label>
            <SelectCategory
              getSelectedValue={getSelectedCategory}
              placeHolder="Categoria"
              setSelectedOptionCategory={setSelectedOptionCategory}
              selectedOptionCategory={selectedOptionCategory}
            />
            {errors.category && (
              <p className="mensajeForm-admin">{errors.category}</p>
            )}
          </div>
        </div>
        <div className="section-container-input-admin">
          <div className="input-container-admin">
            <label id="address" form="address">
              Dirección
            </label>
            <input
              className="input-comun-admin"
              value={values.address}
              type="text"
              name="address"
              id="address"
              placeholder="Dirección"
              onChange={handleChange}
            />
            {errors.address && (
              <p className="mensajeForm-admin">{errors.address}</p>
            )}
          </div>
          <div className="select-container">
            <label>Ciudad</label>
            <SelectCity
              getSelectedValue={getSelectedCity}
              placeHolder="Ciudad"
              selectedOptionCity={selectedOptionCity}
              setSelectedOptionCity={setSelectedOptionCity}
            />
            {errors.city && <p className="mensajeForm-admin">{errors.city}</p>}
          </div>
        </div>
        <div className="section-container-input-admin">
          <div className="input-container-admin">
            <label id="latitude" form="latitude">
              Latitud
            </label>
            <input
              className="input-comun-admin"
              value={values.latitude}
              type="text"
              id="latitude"
              name="latitude"
              placeholder="Latitud"
              onChange={handleChange}
            />
            {errors.latitude && (
              <p className="mensajeForm-admin">{errors.latitude}</p>
            )}
          </div>
          <div className="input-container-admin">
            <label id="logitude" form="logitude">
              Longitude
            </label>
            <input
              className="input-comun-admin"
              value={values.longitude}
              type="text"
              name="longitude"
              id="longitude"
              placeholder="Longitud"
              onChange={handleChange}
            />
            {errors.longitude && (
              <p className="mensajeForm-admin">{errors.longitude}</p>
            )}
          </div>
        </div>
        <div className="input-container-admin-texa">
          <label form="description">Descripción</label>
          <textarea
            value={values.description}
            className="texa-admin"
            placeholder="Escribir aquí la descripción del producto"
            name="description"
            id="description"
            onChange={handleChange}
          />
          {errors.description && (
            <p className="mensajeForm-admin-2">{errors.description}</p>
          )}
        </div>
        <div className="section-container-atributos-admin">
          <h2 className="sub-title-admin">Agregar características</h2>
          <div className="features-container">
            {featuresData.map((feature) => (
              <div key={feature.id} className="feature-item">
                <input
                  type="checkbox"
                  id={feature.id}
                  name={feature.title}
                  onChange={handleFeatureChange}
                />
                <img src={feature.url} alt={feature.title} />
                <p>{feature.title}</p>
              </div>
            ))}
          </div>
          {errors.features && (
            <p className="mensajeForm-admin-2">{errors.features}</p>
          )}
          <h3>¿Quiere agregar nuevas características?</h3>
          {valueFeature.map((feature, i) => {
            return (
              <div key={i} className="new-feature-container-admin">
                <div className="new-feature-inputs-container">
                  <div className="new-feature-input-container">
                    <label id="nameNewFeature" form="nameNewFeature">
                      Nombre
                    </label>

                    <input
                      className="input-comun-admin"
                      value={feature.title}
                      type="text"
                      id="nameNewFeature"
                      name="nameNewFeature"
                      disabled
                    />
                  </div>
                  <div className="new-feature-input-container">
                    <label id="nameNewFeatureImg" form="nameNewFeatureImg">
                      Icono
                    </label>
                    <div className="input-comun-admin-img">
                      <img src={feature.url} alt={feature.title} />
                    </div>
                  </div>
                </div>

                <button
                  id="DeletenewFeature"
                  onClick={() => handleDeleteNewFeature(feature.title)}
                  type="button"
                >
                  <img
                    src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/btnMenos.png"
                    alt="Eliminar característica"
                  />
                </button>
              </div>
            );
          })}
          <div className="new-feature-container-admin">
            <div className="new-feature-inputs-container">
              <div className="new-feature-input-container">
                <label id="nameNewFeature" form="nameNewFeature">
                  Nombre
                </label>
                <input
                  className="input-comun-admin"
                  type="text"
                  id="nameNewFeature"
                  name="nameNewFeature"
                  placeholder="Agregue una característica nueva"
                  value={newFeature.title}
                  onChange={(e) => {
                    setNewFeature({
                      ...newFeature,
                      title: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="new-feature-input-container">
                <label>Icono</label>
                <SelectFeature
                  getSelectedValue={getValueUrl}
                  placeHolder="Seleccione un icono"
                  selectedOptionUrl={selectedOptionUrl}
                  setSelectedOptionUrl={setSelectedOptionUrl}
                />
              </div>
            </div>
            <button
              id="addNewFeature"
              type="button"
              onClick={handleAddNewFeature}
            >
              <img
                src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/btnMas.png"
                alt="Agregar característica"
              />
            </button>
          </div>
          {errors.newFeature && (
            <p className="mensajeForm-admin-2">{errors.newFeature}</p>
          )}
          <h2 className="sub-title-admin">Políticas del producto</h2>
          <div className="grillaPoliticas-admin">
            <div className="policy1-admin">
              <h3>{valuePolicies[0].title}</h3>
              <label id="description-policy1">Descripción</label>
              <textarea
                className="texa-admin"
                placeholder="Escribir aquí las normas de la casa"
                name="description-policy1"
                id="description-policy1"
                value={valuePolicies[0].description}
                onChange={(e) => {
                  setValuePolicies((prevState) => [
                    { title: prevState[0].title, description: e.target.value },
                    prevState[1],
                    prevState[2],
                  ]);
                }}
              />
              {errors.policies1 && (
                <p className="mensajeForm-admin-pol">{errors.policies1}</p>
              )}
            </div>
            <div className="policy2-admin">
              <h3>{valuePolicies[1].title}</h3>
              <label id="description-policy2">Descripción</label>
              <textarea
                className="texa-admin"
                placeholder="Escribir aquí las políticas de salud y seguridad"
                name="description-policy2"
                id="description-policy2"
                value={valuePolicies[1].description}
                onChange={(e) => {
                  setValuePolicies((prevState) => [
                    prevState[0],
                    { title: prevState[1].title, description: e.target.value },
                    prevState[2],
                  ]);
                }}
              />
              {errors.policies2 && (
                <p className="mensajeForm-admin-pol">{errors.policies2}</p>
              )}
            </div>
            <div className="policy3-admin">
              <h3>{valuePolicies[2].title}</h3>
              <label id="description-policy3">Descripción</label>
              <textarea
                className="texa-admin"
                placeholder="Escribir aquí las políticas de cancelación"
                name="description-policy3"
                id="description-policy3"
                value={valuePolicies[2].description}
                onChange={(e) => {
                  setValuePolicies((prevState) => [
                    prevState[0],
                    prevState[1],
                    { title: prevState[2].title, description: e.target.value },
                  ]);
                }}
              />
              {errors.policies3 && (
                <p className="mensajeForm-admin-pol">{errors.policies3}</p>
              )}
            </div>
          </div>

          <h2 className="sub-title-admin">Cargar imágenes</h2>
          {valueImages.map((img, i) => {
            return (
              <div key={i} className="new-img-container-admin">
                <input
                  className="input-comun-admin"
                  value={img.url}
                  type="text"
                  id="img-save"
                  name="img-save"
                  disabled
                />
                <button
                  id="DeleteNewImg"
                  onClick={() => handleDeleteNewImg(img.url)}
                  type="button"
                >
                  <img
                    src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/btnMenos.png"
                    alt="Eliminar Imagen"
                  />
                </button>
              </div>
            );
          })}
          <div className="new-img-container-admin">
            <input
              className="input-comun-admin"
              type="text"
              id="newImg"
              name="newImg"
              placeholder="Insertar https://"
              value={newImg.url}
              onChange={(e) => {
                setNewImg({
                  title: values.nameProduct,
                  url: e.target.value,
                });
              }}
            />
            <button id="addNewImg" type="button" onClick={handleAddNewImg}>
              <img
                src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/btnMas.png"
                alt="Agregar imagen"
              />
            </button>
          </div>
          {errors.images && (
            <p className="mensajeForm-admin-2">{errors.images}</p>
          )}
        </div>
        <button id="btnCrearProducto" type="submit">
          Crear Producto
        </button>
      </form>
    </fieldset>
  );
};

export default FormCrearProducto;
