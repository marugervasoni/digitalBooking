import React, { useEffect, useState } from "react";

const CrearImg = ({ getValue }) => {
  const [images, setImages] = useState([]);
  const [img, setImg] = useState("");
  /*useEffect(() => {
    getValue(images);
  }, [images, getValue]);
*/
  const handleAddImage = () => {
    setImages([...images, img]);
  };
  const handleDeleteImage = (imgValue) => {
    const newArrayImages = images.filter((img) => img.value !== imgValue);
    setImages(newArrayImages);
  };

  return (
    <div>
      {images.map((imgMap, i) => {
        return (
          <div key={i}>
            <input
              className="input-comun-admin"
              value={imgMap.value}
              type="text"
              name="imgMap"
              id="imgMap"
              disabled
            />

            <button onClick={() => handleDeleteImage(imgMap.value)}>
              <img
                src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/btnMenos.png"
                alt="Eliminar Imagen"
              />
            </button>
          </div>
        );
      })}
      <div>
        <input
          className="input-comun-admin"
          onChange={(e) => {
            setImg({
              ...img,
              [e.target.name]: e.target.value,
            });
          }}
          type="text"
          name="newImg"
          id="newImg"
        />
        <button onClick={handleAddImage}>
          <img
            src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/btnMas.png"
            alt="Agregar Imagen"
          />
        </button>
      </div>
    </div>
  );
};

export default CrearImg;
