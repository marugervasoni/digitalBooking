import React, { useEffect, useState } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  PinterestIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import "../../styles/producto.css";
import "../../index.css";

//Se podría refactorizar el código cosa que en formato mobile se vea native... no se se lo dejo a mi yo del futuro
//Por ahora se utilizó esta librería npm install react-share --save
//Documentación: https://github.com/nygardk/react-share
//Se agrego el botón X para cerrar el share
const Compartir = ({ title, share }) => {
  const [productUrl, setProductUrl] = useState("");
  const [showShareOptions, setShowShareOptions] = useState(false);

  const urlWeb = "digitalbooking2.ddns.net";

  const handleShareClick = () => {
    showShareOptions ? setShowShareOptions(false) : setShowShareOptions(true);
  };

  const handleCopyClick = (url) => {
    localStorage.setItem("copyUrl", url);
    navigator.clipboard.writeText(url);
  };

  const handleCloseClick = () => {
    setShowShareOptions(false);
  };

  useEffect(() => {
    const url = window.location.href;
    setProductUrl(url);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <img src={share} alt="Compartir" onClick={handleShareClick} />
      {showShareOptions && (
        <div className="share-options">
          <button className="close-btn" onClick={handleCloseClick}>
            X
          </button>
          <p className="title-share">¿Querés compartir {title}?</p>
          <div className="link-container">
            <p className="link">{productUrl}</p>
            <button id="btnShareProduct" onClick={handleCopyClick(productUrl)}>
              Copiar
            </button>
          </div>
          <div className="share-buttons">
            <EmailShareButton url={productUrl}>
              <EmailIcon size={32} round />
            </EmailShareButton>
            <FacebookShareButton className="social-media-btn" url={productUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton className="social-media-btn" url={productUrl}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton className="social-media-btn" url={productUrl}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TelegramShareButton className="social-media-btn" url={productUrl}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <PinterestShareButton url={productUrl}>
              <PinterestIcon className="social-media-btn" size={32} round />
            </PinterestShareButton>
          </div>
          <p className="title-share">¿Querés compartir Digital Booking?</p>
          <div className="link-container">
            <p className="link">{urlWeb}</p>
            <button id="btnSharePage" onClick={handleCopyClick(urlWeb)}>
              Copiar
            </button>
          </div>
          <div className="share-buttons">
            <EmailShareButton className="social-media-btn" url={urlWeb}>
              <EmailIcon size={32} round />
            </EmailShareButton>
            <FacebookShareButton className="social-media-btn" url={urlWeb}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton className="social-media-btn" url={urlWeb}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={urlWeb}>
              <WhatsappIcon className="social-media-btn" size={32} round />
            </WhatsappShareButton>
            <TelegramShareButton className="social-media-btn" url={urlWeb}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <PinterestShareButton className="social-media-btn" url={urlWeb}>
              <PinterestIcon size={32} round />
            </PinterestShareButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compartir;
