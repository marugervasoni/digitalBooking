import { TYPES } from "../actions/actionsProduct";

export function reducerNewProduct(state, action) {
  switch (action.type) {
    case TYPES.PRODUCT_RANDOM: {
      const { data, error, isLoading } = useFetch(
        `/products/category/${action.payload}`
      );
      return productos.filter(
        (producto) => producto.category.title === action.payload
      );
    }
    case TYPES.PRODUCT_CATEGORY: {
      return productos.filter(
        (producto) => producto.category.title === action.payload
      );
    }
    case TYPES.PRODUCT_LOCATION: {
      return [
        productos.find((producto) => producto.city.id === action.payload),
      ];
    }
    default: {
      throw new Error(
        "Hubo un error en el filtro de los productos seleccionado"
      );
    }
  }
}

/*const { data, error, isLoading } = useFetch(`/products/category/${action.payload}`);*/
