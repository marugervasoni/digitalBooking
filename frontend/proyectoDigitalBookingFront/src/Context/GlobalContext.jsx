import {
  createContext,
  useContext,
  useState,
  useMemo,
  useReducer,
  useEffect,
} from "react";
import { reducerUser } from "./reducer/reducerUser";
import productos from "../Utils/productos.json";
import { reducerProduct } from "./reducer/reducerProduct";
import { reducerNewProduct } from "./reducer/reducerNewProduct";
import useFetch from "../Hooks/useFetch";
//Modificaciones: se sacaron los pedidos a las apis y se está por sacar el loading cuando tenga la api de productos
const initialState = {
  user: {
    users: [
      {
        ciudad: "CABA",
        confirmPassword: "654321",
        email: "admin@gmail.com",
        createProduct: [],
        isVerified: true,
        lastName: "Rodriguez",
        name: "Bruno",
        password: "654321",
        admin: true,
        id: 0,
        favUser: [],
        booking: [],
      },
      {
        name: "Cleo",
        lastName: "Reina",
        email: "cleo@gmail.com",
        ciudad: "CABA",
        password: "741852",
        confirmPassword: "741852",
        favUser: [],
        isVerified: true,
        idGenerate: "idGenerate",
        admin: false,
        id: 2,
        booking: [],
      },
    ],
    infoUser: {},
    log: false,
    token: "",
  },
  productos: productos,
  newProduct: [],
};
export const GlobalStates = createContext();
const GlobalContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allProductsAPI, setAllProductsAPI] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [emailjsVar, setEmailjsVar] = useState({
    SERVICE_ID: "service_dxxd9u8",
    PUBLIC_KEY: "Op2tl2qbwNVPp4a_n",
    TEMPLATE_ID_PRUEBA_REGISTRO: "template_v1rk8vs",
    TEMPLATE_ID_BOOKING: "template_stfqmvk",
  });
  function initUser(initialValue) {
    return localStorage.getItem("stateUser")
      ? JSON.parse(localStorage.getItem("stateUser"))
      : initialValue;
  }

  const [stateUser, dispatchUser] = useReducer(
    reducerUser,
    initialState.user,
    initUser
  );
  useEffect(() => {
    localStorage.setItem("stateUser", JSON.stringify(stateUser));
  }, [stateUser]);

  /*
    async function fetchListProducts() {
      const response = await fetch(
        "http://ec2-18-191-208-143.us-east-2.compute.amazonaws.com:8080/Products/bringAll"
        );
        if (!response.ok) {
          throw new Error("Error fetching products");
        }
        const data = await response.json();
        return data;
      }
      
      useEffect(() => {
        try {
          fetchListProducts().then((data) => setAllProductsAPI(data.data.items));
        } catch (error) {
      console.error(error);
    }
  }, []);*/

  /// Dispatch
  const [stateProduct, dispatchProduct] = useReducer(
    reducerProduct,
    initialState.productos
  );
  const { data, error, isLoading } = useFetch(`/products/listAll`);
  const [initialProducts, setInitialProducts] = useState([]);
  useEffect(() => {
    if (data) {
      setInitialProducts(data);
    } else if (error) {
      console.error(error);
    }
  }, [data, error]);
  const [stateNewProduct, dispatchNewProduct] = useReducer(
    reducerNewProduct,
    initialProducts
  );
  const [productoReserva, setProductoReserva] = useState();

  const providerValue = useMemo(
    () => ({
      loading,
      setLoading,
      stateUser,
      dispatchUser,
      stateProduct,
      dispatchProduct,
      allProductsAPI,
      setAllProductsAPI,
      idProducto,
      setIdProducto,
      endDate,
      setEndDate,
      startDate,
      setStartDate,
      emailjsVar,
      setEmailjsVar,
      stateNewProduct,
      dispatchNewProduct,
      initialProducts,
      productoReserva,
      setProductoReserva,
    }),
    [
      loading,
      setLoading,
      stateUser,
      dispatchUser,
      stateProduct,
      dispatchProduct,
      allProductsAPI,
      setAllProductsAPI,
      idProducto,
      setIdProducto,
      endDate,
      setEndDate,
      startDate,
      setStartDate,
      emailjsVar,
      setEmailjsVar,
      stateNewProduct,
      dispatchNewProduct,
      initialProducts,
      productoReserva,
      setProductoReserva,
    ]
  );
  return (
    <GlobalStates.Provider value={{ providerValue }}>
      {children}
    </GlobalStates.Provider>
  );
};

export default GlobalContext;
export const useGlobalStates = () => {
  return useContext(GlobalStates);
};
