import React, { useState } from "react";
import { TYPES } from "../../Context/actions/actionsUser";
import { useGlobalStates } from "../../Context/GlobalContext";
import Compartir from "./Compartir";
import "../../styles/producto.css";
import "../../index.css";

const Interaccion = ({ id, title, producto }) => {
  const { providerValue } = useGlobalStates();
  const { stateUser, dispatchUser } = providerValue;
  console.log(stateUser);
  console.log(stateUser.log);
  console.log(producto);

  //Ale:
  //Ya está la lógica del logueo ahora queda pasarlo a la card.
  //Modifiqué los dispatchs por eso ves diferente el codigo tmb
  //Está igual en la card ahí fijate en el figma donde iría el corazón y como implementás la lógica pero debería ser parecida que acá.
  //Acá te dejo todas las urls que vas a necesitar para los corazones de ésta página para las cards. Fijate cual es cual y dónde va cada uno. Ya esta página tiene el me gusta vacio, falta el que es relleno para cuando esté megusteado.
  //https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/atomo+corazon+linea-1.png
  //https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/atomo+corazon+linea.png
  //https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/favorito-1.png
  //https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/favorito.png (Todo violeta)
  //Traje por props lo que tenés que usar en el dispatch para agregar a favoritos y luego en la página que tenés que crear mapealos con las cards
  //Ya está creada la ruta de favoritos en app.jsx y en el archivo routes y en Routes vas a encontrar Favoritos vacio para que hagas la página. (Te importé algunas cosas que seguro vas a necesitar)
  //No dice como ir a la página de favoritos podes pensar como lo querés hacer, yo haría un botón que aparezca sólo si la persona está logeada pero no dice nada así que hace lo que creas mejor o lo hablamos
  //Te dejé los console.log para que puedas ver lo que tiene el reducer y cómo funciona pero si te molestan sacalos
  //Los reducer de favs funcionan bien, ya los probé pero lo saqué para que puedas cranearlo vos!
  //Cuando quieras hacer el map en Favoritos con las cards fijate que podes mapear stateUser, pero no es stateUser solo fijate como hago el console.log de la linea 10 de acá y repensalo para que se mapee donde están guardados los favoritos.
  //Pista para hacer el megusta y nomegusta para que se vea como un mismo botón deberías hacer un find por id... stateUser.favs.find(resto de la lógica)
  //Pd: Avisame cualquier cosa y te doy una mano. ¡Dale que podés, éxitos!

  /**
   Para que se agregue el like y sacarlo la lógica es parecida a esta 
   
   {stateFav.find((i) => i.id === id) ? (
        <button onClick={removeFav} className="favButtonAdd">
          🌟
        </button>
      ) : (
        <button onClick={addFav} className="favButton">
          ⭐
        </button>

----------

   */

  //   const addFav = () => {
  //     dispatchUser({
  //       type: TYPES.ADD_FAV_USER,
  //       payload: { id, img, category, title, location, description },
  //     });

  //   };
  //   const removeFav = () => {
  //     dispatchUser({
  //       type: TYPES.REMOVE_FAV_USER,
  //       payload: id,
  //     });
  //   };

  //   return (
  //     <div className="interación-container">
  //       <Compartir title={title} />
  //       {/* {stateUser.favs.find ((i) => i.id === id) ? ( */}

  //       <img
  //       onClick={addFav}
  //       width="25"
  //       height="25"
  //       src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/atomo+corazon+linea-1.png"
  //       alt="Me gusta"
  //     ></img>
  //       {/* ) : ( */}
  //         <img
  //         onClick={removeFav}
  //         width="25"
  //         height="25"
  //         src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/favorito.png"
  //         alt="Me gusta"
  //       />
  //       {/* )
  //     } */}
  //     </div>
  //   );
  // };

  // export default Interaccion;

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
    <div className="interación-container">
      <Compartir
        title={title}
        share={
          "https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/atomo+compartir.png"
        }
      />
      {stateUser.log === false ? (
        <img
          width="25"
          height="25"
          src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/atomo+corazon+linea-1.png"
          alt="Me gusta"
        />
      ) : (
        <img
          onClick={handleFavClick}
          width="25"
          height="25"
          src={
            isFav
              ? "https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/favorito.png"
              : "https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/atomo+corazon+linea-1.png"
          }
          alt="Me gusta"
        />
      )}
    </div>
  );
};

export default Interaccion;
