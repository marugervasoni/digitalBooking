import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../styles/producto.css";
import "../../index.css";

const Map = ({ latitude, longitude, name }) => {
  const markerPosition = [latitude, longitude];
  const center = [latitude, longitude];
  const zoom = 13;
  //Pasos a seguir: https://leafletjs.com/examples/quick-start/
  //Tuve que importar: npm install react react-dom leaflet y esto npm install react-leaflet
  return (
    <MapContainer
      key={`${latitude}-${longitude}`}
      center={center}
      zoom={zoom}
      className="mapProducto"
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      <Marker position={markerPosition}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
