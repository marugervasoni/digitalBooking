import React, { useEffect, useState } from "react";
import Card from "./Card";
import "../../styles/recomendaciones.css";
import "../../index.css";

const Recomendados = ({ loading, setLoading, product }) => {
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalItems = product.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visibleItems = product.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSpecificPageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <div>
        {loading ? (
          <p>Cargando ...</p>
        ) : (
          <div className="recomendacionesCuerpo">
            {visibleItems.length > 0 &&
              visibleItems.map((item) => (
                <React.Fragment key={item.id}>
                  <Card
                    id={item.id}
                    category={item.category.title}
                    img={item.images[0].url}
                    title={item.name}
                    location={item.city.name}
                    description={item.description}
                    producto={item}
                  />
                </React.Fragment>
              ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              id="btnPrevPagination"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <img src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/backColor.png" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  id="btnNumberPagination"
                  key={pageNumber}
                  className={pageNumber === currentPage ? "active" : ""}
                  onClick={() => handleSpecificPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
            <button
              id="btnNextPagination"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <img src="https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Utils/nextColor.png" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Recomendados;
/*
 */
