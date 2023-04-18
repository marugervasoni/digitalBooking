import React, { useState } from "react";
import { useGlobalStates } from "../../Context/GlobalContext";
import Compartir from "./Compartir";
import { TYPES } from "../../Context/actions/actionsUser";

const InteraccionMobile = ({ id, title, producto }) => {
  const { providerValue } = useGlobalStates();
  const { stateUser, dispatchUser } = providerValue;

  const [isFav, setIsFav] = useState(
    stateUser.favs?.find((i) => i.id === id) !== undefined
  );

  const addFav = () => {
    dispatchUser({
      type: TYPES.ADD_FAV_USER,
      payloadEmail: stateUser.infoUser.email,
      payloadFav: producto,
    });
    setIsFav(true);
  };

  const removeFav = () => {
    dispatchUser({
      type: TYPES.REMOVE_FAV_USER,
      payloadEmail: stateUser.infoUser.email,
      payloadFavId: id,
    });
    setIsFav(false);
  };

  const handleFavClick = () => {
    if (isFav) {
      removeFav();
    } else {
      addFav();
    }
  };
  return (
    <div className="interación-container-mobile">
      <Compartir
        title={title}
        share={
          "https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/share-blanco.png"
        }
      />
      {stateUser.log === false ? (
        <img
          width="25"
          height="25"
          src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/corazon-blanco-vacio.png"
          alt="Me gusta"
        />
      ) : (
        <img
          onClick={handleFavClick}
          width="25"
          height="25"
          src={
            isFav
              ? "https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/favorito-1.png"
              : "https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/atomo+corazon+linea.png"
          }
          alt="Me gusta"
        />
      )}
    </div>
  );
};

export default InteraccionMobile;
