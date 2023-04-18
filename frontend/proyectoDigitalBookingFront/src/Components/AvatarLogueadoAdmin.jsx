import React, { useEffect, useRef, useState } from "react";
import { useGlobalStates } from "../Context/GlobalContext";
import { TYPES } from "../Context/actions/actionsUser";
import "../styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../Routes/routes";

//Falta cambiar la lógica para que vaya a la pantalla de administración
const AvatarLogueadoAdmin = ({ isNavExpanded, setIsNavExpanded }) => {
  const { providerValue } = useGlobalStates();
  const { idProducto, stateUser, dispatchUser } = providerValue;
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const avatarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [avatarRef]);

  return (
    <>
      <div className="navigation-menu expanded">
        <div className="menuMobile">
          <button
            id="cerrarMenuMobileHeaderLogAdmin"
            onClick={() => {
              setIsNavExpanded(false);
            }}
          >
            X
          </button>
          <div className="avatar-mobile">
            <h2 id="avatar">
              {stateUser.infoUser.name.charAt(0).toUpperCase()}
              {stateUser.infoUser.lastName.charAt(0).toUpperCase()}{" "}
            </h2>
            <div className="saludo-container">
              <span id="saludo"> Hola, </span>
              <span id="user-name">
                {" "}
                {stateUser.infoUser.name} {stateUser.infoUser.lastName}{" "}
              </span>{" "}
            </div>
          </div>
        </div>

        <button
          id="btnAdminMobile"
          className="botonMenuMobile"
          onClick={(e) => {
            e.preventDefault();
            navigate(routes.admin);
            setIsNavExpanded(false);
          }}
        >
          Administración
        </button>
        <hr className="menuLine" />
        <button
          id="btnFavMobile"
          className="botonMenuMobile"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${stateUser.infoUser.id}/favoritos`);
            setIsNavExpanded(false);
          }}
        >
          Mis Favoritos
        </button>
        <hr className="menuLine" />
        <button
          id="btnReservasMobile"
          className="botonMenuMobile"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${stateUser.infoUser.id}/reservas`);
            setIsNavExpanded(false);
          }}
        >
          Mis Reservas
        </button>
        <div className="mobile-cerrarSesion">
          <p>
            ¿Deseas{" "}
            <span
              onClick={(e) => {
                e.preventDefault();
                dispatchUser({
                  type: TYPES.LOG_OUT_USER,
                });
                navigate(routes.home);
                setIsNavExpanded(false);
              }}
              className="registrate"
              id="cerrarSesiónMenuMob"
            >
              cerrar sesión
            </span>
            ?
          </p>
          <hr className="menuLine" />
        </div>
        <div className="logos-menu">
          <div>
            <img
              className="logoMenu"
              src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/face-menu.png"
              alt="Facebook"
            />
            <img
              className="logoMenu"
              src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/linkdin-menu.png"
              alt="Linkedin"
            />

            <img
              className="logoMenu"
              src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/tweet-menu.png"
              alt="Twitter"
            />
            <img
              className="logoMenu"
              src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/ig-menu.png"
              alt="Instagram"
            />
          </div>
        </div>
      </div>
      <div className="usuarioLogeado navigation-menu" ref={avatarRef}>
        <Link to={routes.admin}>Administración</Link>
        <span className="lineaVertical"></span>
        <h2 id="avatar" onClick={() => setShowMenu(!showMenu)}>
          {stateUser.infoUser.name.charAt(0).toUpperCase()}
          {stateUser.infoUser.lastName.charAt(0).toUpperCase()}{" "}
        </h2>
        <div
          className="saludo-container"
          onClick={() => setShowMenu(!showMenu)}
        >
          <span id="saludo"> Hola, </span>
          <span id="user-name">
            {" "}
            {stateUser.infoUser.name} {stateUser.infoUser.lastName}{" "}
          </span>{" "}
        </div>
        {!showMenu && (
          <button
            id="btnXCerrarSesionAdmin"
            onClick={(e) => {
              e.preventDefault();
              dispatchUser({
                type: TYPES.LOG_OUT_USER,
              });
              navigate(routes.home);
            }}
          >
            X
          </button>
        )}
        {showMenu && (
          <div className="menu-extendible">
            <div
              className="menu-item"
              onClick={(e) => {
                e.preventDefault();
                navigate(routes.admin);
              }}
            >
              <img
                src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/admin-menu.png"
                alt="Administración"
              />
              <p>Administración</p>
            </div>
            <div
              className="menu-item"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${stateUser.infoUser.id}/favoritos`);
              }}
            >
              <img
                src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/fav-menu.png"
                alt="Mis Favoritos"
              />
              <p>Mis Favoritos</p>
            </div>
            <div
              className="menu-item"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${stateUser.infoUser.id}/reservas`);
              }}
            >
              <img
                src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/booking-menu.png"
                alt="Mis Reservas"
              />
              <p>Mis Reservas</p>{" "}
            </div>
            <div
              className="menu-item"
              onClick={(e) => {
                e.preventDefault();
                dispatchUser({
                  type: TYPES.LOG_OUT_USER,
                });
                navigate(routes.home);
              }}
            >
              <img
                src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/cerrar-menu.png"
                alt="Cerrar Sesión"
              />
              <p>Cerrar Sesión</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AvatarLogueadoAdmin;
