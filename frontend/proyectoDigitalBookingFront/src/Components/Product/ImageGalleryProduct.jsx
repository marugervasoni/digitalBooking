import React from "react";
import { useState, useRef } from "react";
import ImageGalery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../styles/producto.css";
import "../../index.css";
import InteraccionMobile from "./InteraccionMobile";
const ImageCalleryProduct = ({
  name,
  imagenes,
  img1,
  img2,
  img3,
  img4,
  img5,
  id,
  producto,
}) => {
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);

  const abrirGaleria = useRef({});
  const imagenesFormateadas = imagenes.map((imagen) => ({
    original: imagen.url,
    thumbnail: imagen.url,
  }));
  const imagenesFormateadas2 = imagenes.map((imagen) => ({
    original: imagen.url,
  }));
  console.log(imagenes);
  console.log(imagenesFormateadas);
  return (
    <>
      <div className="grillaImagenes">
        <div className="div1">
          {" "}
          <img src={img1} alt={name} />
        </div>
        <div className="div2">
          {" "}
          <img src={img2} alt={name} />
        </div>
        <div className="div3">
          {" "}
          <img src={img3} alt={name} />
        </div>
        <div className="div4">
          {" "}
          <img src={img4} alt={name} />
        </div>
        <div className="div5">
          {" "}
          <img src={img5} alt={name} />
        </div>
      </div>
      <div>
        <button
          className="botonVerMas"
          onClick={() => {
            setIsGalleryExpanded(!isGalleryExpanded);
          }}
        >
          Ver mas
        </button>
      </div>

      <div
        className={
          isGalleryExpanded ? "galeriaImagenes expanded" : "galeriaImagenes"
        }
      >
        <div className="modal">
          <div className="img-container-model">
            <ImageGalery
              ref={abrirGaleria}
              items={imagenesFormateadas}
              showPlayButton={false}
              showFullscreenButton={false}
              showIndex={true}
              fullScreen={true}
              useBrowserFullscreen={false}
              showThumbnails
            />
          </div>

          <button
            id="close-modal-img"
            onClick={() => {
              setIsGalleryExpanded(!isGalleryExpanded);
            }}
          >
            X
          </button>
        </div>
      </div>
      <div className="galeriaMobile">
        <div className="mobile-interaccion-container">
          <InteraccionMobile id={id} title={name} producto={producto} />
          <ImageGalery
            ref={abrirGaleria}
            items={imagenesFormateadas2}
            showPlayButton={false}
            showFullscreenButton={false}
            showIndex={true}
            fullScreen={true}
            useBrowserFullscreen={false}
            autoPlay={true}
            slideDuration={3000}
          />
        </div>
      </div>
    </>
  );
};

export default ImageCalleryProduct;
/* Posible solución para que aparezcan sólo 4 imágenes

const [thumbnailsToShow, setThumbnailsToShow] = useState(4);
showThumbnails={thumbnailsToShow === imagenesFormateadas.length ? true : false}
<ImageGallery
  ref={abrirGaleria}
  items={imagenesFormateadas}
  showPlayButton={false}
  showFullscreenButton={false}
  showIndex={true}
  fullScreen={true}
  useBrowserFullscreen={false}
  showThumbnails
  thumbnailPosition='bottom'
  lazyLoad={true}
  lazyLoadOffset={100}
  lazyLoadInterval={1000}
  slideDuration={500}
  thumbnailSlideDuration={250}
  onSlide={(currentIndex) => setThumbnailsToShow(currentIndex + 4)}
  startIndex={0}
  slideDuration={550}
  infinite={true}
  additionalClass="app-image-gallery"
  showNav={false}
  showBullets={false}
  showFullscreenButton={false}
  showThumbnails={true}
  showIndex={false}
  thumbnailPosition="bottom"
  lazyLoad={true}
  items={imagenesFormateadas}
  slideDuration={450}
  autoPlay={false}
  lazyLoad={true}
  lazyLoadOffset={100}
  onSlide={handleSlide}
  showThumbnails={thumbnailsToShow === imagenesFormateadas.length ? true : false}
  thumbnailPosition="bottom"
  /> */
