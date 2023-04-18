import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGlobalStates } from "../Context/GlobalContext";
import { routes } from "../Routes/routes";
import "../styles/header.css";
import AvatarLogueado from "./AvatarLogueado";
import AvatarLogueadoAdmin from "./AvatarLogueadoAdmin";

//Modificaciones que desaparezca el boton de registro o login dependiendo si están en esa ruta o no, también verifica si viene de la url del producto o no y agregué el escrito por fuera del logo

const Header = () => {
  const { providerValue } = useGlobalStates();
  const { idProducto, stateUser, dispatchUser } = providerValue;
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [menuPosition, setMenuPosition] = useState("fixed");
  const location = useLocation().pathname;
  const locationAct = useLocation();
  const queryParams = new URLSearchParams(locationAct.search);
  const fromParam = queryParams.get("from");
  useEffect(() => {
    const handleScroll = () => {
      if (isNavExpanded) {
        setMenuPosition("absolute");
      } else {
        setMenuPosition("fixed");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav style={{ position: menuPosition, zIndex: 100 }}>
      <div>
        <Link to={routes.home}>
          <img className="logoDesktop" src="/img/logo 1.png" />{" "}
          <img className="logoDesktop" src="/img/sentiteComoEnTuHogar.png" />
          <img className="logoMobile" src="/img/logo 1.png" />
        </Link>
      </div>
      {isNavExpanded ? null : (
        <i
          id="bars"
          className="fas fa-bars"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        ></i>
      )}
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        {stateUser.log === false ? (
          <div>
            <div className="btnsDescktop-laptop">
              {location !== routes.registro && (
                <Link
                  to={{
                    pathname: routes.registro,
                    search: fromParam ? `?from=/producto/${idProducto.id}` : "",
                  }}
                >
                  <button
                    id="btnMenuCrearCuentaDL"
                    onClick={() => {
                      setIsNavExpanded(!isNavExpanded);
                    }}
                  >
                    {" "}
                    Crear Cuenta
                  </button>
                </Link>
              )}

              {location !== routes.login && (
                <Link
                  to={{
                    pathname: routes.login,
                    search: fromParam ? `?from=/producto/${idProducto.id}` : "",
                  }}
                >
                  <button
                    id="btnMenuIniciarSesionDL"
                    onClick={() => {
                      setIsNavExpanded(!isNavExpanded);
                    }}
                  >
                    Iniciar Sesión
                  </button>
                </Link>
              )}
            </div>
            <div className="menuMobile">
              <button
                id="cerrarMenuMobileHeader"
                onClick={() => {
                  setIsNavExpanded(!isNavExpanded);
                }}
              >
                X
              </button>
              <h2>MENU</h2>
            </div>
            {location !== routes.registro && (
              <Link
                to={{
                  pathname: routes.registro,
                  search: fromParam ? `?from=/producto/${idProducto.id}` : "",
                }}
              >
                <button
                  id="btnMenuCrearCuenta"
                  className="botonMenuMobile"
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                >
                  {" "}
                  Crear Cuenta
                </button>
              </Link>
            )}
            {location === routes.login ||
            location === routes.registro ? null : (
              <hr className="menuLine" />
            )}

            {location !== routes.login && (
              <Link
                to={{
                  pathname: routes.login,
                  search: fromParam ? `?from=/producto/${idProducto.id}` : "",
                }}
              >
                <button
                  id="btnMenuIniciarSesion"
                  className="botonMenuMobile"
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                >
                  Iniciar Sesión
                </button>
              </Link>
            )}
            <div className="logos-menu">
              <hr className="menuLine" />
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
        ) : stateUser.infoUser.admin ? (
          <AvatarLogueadoAdmin
            isNavExpanded={isNavExpanded}
            setIsNavExpanded={setIsNavExpanded}
          />
        ) : (
          <AvatarLogueado
            isNavExpanded={isNavExpanded}
            setIsNavExpanded={setIsNavExpanded}
          />
        )}
      </div>
    </nav>
  );
};
export default Header;
/*
Tal vez cuando sepa como viene el back refactorizo el front así 
stateUser.role === "admin" ? (
  // code for logged-in administrators
) : (
  // code for logged-in non-administrators
)}
*/
