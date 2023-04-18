import React, { useState, useEffect } from "react";
import "../../styles/administracion.css";
import features from "../../Utils/features.json";
import useForm from "../../Hooks/useForm";
//Me generaba miles de errores por cuestión de tiempo lo hice todo en el form general pero después con más tiempo voy a refactorizar el código para que quede mejor.
//La idea es poder hacer un select para que aparezca los íconos y que la persona pueda ponerle el nombre de la característica que quiera
const CrearCaracteristicas = ({ getValue, errorsFeatures, isSub }) => {
  const [featuresData, setFeaturesData] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    setFeaturesData(features.data);
    getValue(selectedFeatures);
    //if (isSub === true) {
    //  setSelectedFeatures([]);
    //}
  }, [features, selectedFeatures, getValue, isSub]);

  const handleFeatureChange = (event) => {
    const { name } = event.target;
    const featureIndex = featuresData.findIndex(
      (feature) => feature.name === name
    );
    const feature = featuresData[featureIndex];
    setSelectedFeatures((prevState) => {
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

  const initialValues = {
    nameFeature: "",
    iconFeature: "",
  };
  const validate = (values) => {
    const errorsFeature = {};
    if (!values.name) {
      errorsFeature.name = "Este campo es obligatorio";
    }
    if (!values.icon) {
      errorsFeature.category = "Este campo es obligatorio";
    }

    return errorsFeature;
  };
  const onSubmit = async (values, setErrors) => {
    dispatchUser({
      type: TYPES.ADD_USERS,
      payload: values,
    });
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate,
    onSubmit
  );

  return (
    <>
      <div className="features-container">
        {featuresData.map((feature) => (
          <div key={feature.id} className="feature-item">
            <input
              type="checkbox"
              id={feature.id}
              name={feature.name}
              onChange={handleFeatureChange}
            />
            <img src={feature.icon} alt={feature.name} />
            <p>{feature.name}</p>
          </div>
        ))}
      </div>
      {errorsFeatures && (
        <p className="mensajeForm-admin-2">{errorsFeatures}</p>
      )}
      <h3>¿Quiere personalizar la característica?</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label id="nameNewFeature" form="nameNewFeature">
            Nombre
          </label>
          <input
            className="input-comun-admin"
            value={values.nameFeature}
            type="text"
            id="nameNewFeature"
            name="nameNewFeature"
            onChange={handleChange}
          />
        </div>
        {/* Esto reemplazar con un select
        {featuresData.map((feature) => (
          <div key={feature.id} className="feature-item">
            <label id="iconNewFeature" form="iconNewFeature">
              Icon
            </label>
            <input
              className="input-comun-admin"
              value={values.nameFeature}
              type="text"
              id="iconNewFeaturee"
              name="iconNewFeature"
              onChange={handleChange}
            />
          </div>
        ))}
         */}
      </form>
    </>
  );
};

export default CrearCaracteristicas;
