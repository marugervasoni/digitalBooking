import React, { useEffect, useState } from "react";
import "../../styles/administracion.css";
//Me generaba miles de errores por cuestión de tiempo lo hice todo en el form general pero después con más tiempo voy a refactorizar el código para que quede mejor.
const CrearPoliticas = ({
  getValue,
  pol1,
  pol2,
  pol3,
  placeholder1,
  placeholder2,
  placeholder3,
  isSub,
  errors3,
  errors2,
  errors1,
  valuePolicies,
}) => {
  const [policy1, setPolicy1] = useState({
    title: "Normas de la casa",
    description: "",
  });
  const [policy2, setPolicy2] = useState({ title: pol2, description: "" });
  const [policy3, setPolicy3] = useState({ title: pol3, description: "" });
  const [policyCompleted1, setPolicyCompleted1] = useState(true);
  const [policyCompleted2, setPolicyCompleted2] = useState(true);
  const [policyCompleted3, setPolicyCompleted3] = useState(true);
  const ejemplo = [
    { title: "Normas de la casa", description: "" },
    { title: "Salud y seguridad", description: "" },
    { title: "Políticas de Cancelación", description: "" },
  ];
  useEffect(() => {
    if (valuePolicies[0].description === "") {
      setPolicyCompleted1(false);
    }
    if (valuePolicies[1].description === "") {
      setPolicyCompleted2(false);
    }
    if (valuePolicies[0].description === "") {
      setPolicyCompleted3(false);
    }
    getValue(policy1, policy2, policy3);
    //if (isSub) {
    // setPolicy1({ title: valuePolicies[0].title, description: "" });
    //}
  }, [
    policy1,
    policy2,
    policy3,
    policyCompleted1,
    policyCompleted2,
    policyCompleted3,
    valuePolicies,
    isSub,
  ]);
  console.log(valuePolicies);
  console.log(policy1);
  console.log(valuePolicies[0]);
  console.log(policy2);
  return (
    <>
      <div className="grillaPoliticas-admin">
        <div className="policy1-admin">
          <h3>{pol1}</h3>
          <label id="description-policy1">Descripción</label>
          <textarea
            className="texa-admin"
            placeholder={placeholder1}
            name="description-policy1"
            id="description-policy1"
            value={policy1.description}
            onChange={(e) => {
              setPolicy1({
                title: valuePolicies[0].title,
                description: e.target.value,
              });
              setPolicyCompleted1(!!e.target.value);
            }}
          />
          {!policyCompleted1 && errors1 && (
            <p className="mensajeForm-admin">{errors1}</p>
          )}
        </div>
        <div className="policy2-admin">
          <h3>{pol2}</h3>
          <label id="description-policy2">Descripción</label>
          <textarea
            className="texa-admin"
            placeholder={placeholder2}
            name="description-policy2"
            id="description-policy2"
            value={policy2.description}
            onChange={(e) => {
              setPolicy2({
                title: valuePolicies[1].title,
                description: e.target.value,
              });
              setPolicyCompleted2(!!e.target.value);
            }}
          />
          {!policyCompleted2 && errors2 && (
            <p className="mensajeForm-admin">{errors2}</p>
          )}
        </div>
        <div className="policy3-admin">
          <h3>{pol3}</h3>
          <label id="description-policy3">Descripción</label>
          <textarea
            className="texa-admin"
            placeholder={placeholder3}
            name="description-policy3"
            id="description-policy3"
            value={policy3.description}
            onChange={(e) => {
              setPolicy3({
                title: valuePolicies[3].title,
                description: e.target.value,
              });
              setPolicyCompleted3(!!e.target.value);
            }}
          />
          {!policyCompleted3 && errors3 && (
            <p className="mensajeForm-admin">{errors3}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CrearPoliticas;
/*{!policyCompleted1 && errorsPolicies && (
            <p className="mensajeForm-admin">Este campo es obligatorio</p>
          )}
          
          
          
           return (
    <>
      <div className="grillaPoliticas-admin">
        <div className="policy1-admin">
          <h3>{valuePolicies[0].title}</h3>
          <label id="description-policy1">Descripción</label>
          <textarea
            className="texa-admin"
            placeholder={placeholder1}
            name="description-policy1"
            id="description-policy1"
            value={policy1.description}
            onChange={(e) => {
              setPolicy1({
                title: valuePolicies[0].title,
                description: e.target.value,
              });
              setPolicyCompleted1(!!e.target.value);
            }}
          />
          {!policyCompleted1 && errors1 && (
            <p className="mensajeForm-admin">{errors1}</p>
          )}
        </div>
        <div className="policy2-admin">
          <h3>{pol2}</h3>
          <label id="description-policy2">Descripción</label>
          <textarea
            className="texa-admin"
            placeholder={placeholder2}
            name="description-policy2"
            id="description-policy2"
            onChange={(e) => {
              setPolicy2({
                title: pol2,
                description: e.target.value,
              });
              setPolicyCompleted2(!!e.target.value);
            }}
          />
          {!policyCompleted2 && errors2 && (
            <p className="mensajeForm-admin">{errors2}</p>
          )}
        </div>
        <div className="policy3-admin">
          <h3>{pol3}</h3>
          <label id="description-policy3">Descripción</label>
          <textarea
            className="texa-admin"
            placeholder={placeholder3}
            name="description-policy3"
            id="description-policy3"
            onChange={(e) => {
              setPolicy3({
                title: pol3,
                description: e.target.value,
              });
              setPolicyCompleted3(!!e.target.value);
            }}
          />
          {!policyCompleted3 && errors3 && (
            <p className="mensajeForm-admin">{errors3}</p>
          )}
        </div>
      </div>
    </>
  );
          
          
          */
