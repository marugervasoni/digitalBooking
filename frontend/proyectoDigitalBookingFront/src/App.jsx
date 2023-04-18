import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import "./App.css";
import Footer from "./Components/Footer";
import { routes } from "./Routes/routes";
import Home from "./Routes/Home";
import NotFound from "./Routes/NotFound";
import Login from "./Routes/Login";
import Registro from "./Routes/Registro";
import Producto from "./Routes/Producto";
import ReservaProducto from "./Routes/ReservaProducto";
import Favoritos from "./Routes/Favoritos";
import ReservaExitosa from "./Routes/ReservaExitosa";
import CuentaConfirmada from "./Routes/CuentaConfirmada";
import ReservasUser from "./Routes/ReservasUser";
import Administracion from "./Routes/Administracion";
import ProductoCreado from "./Routes/ProductoCreado";
//cambiar reserv y fav por reservasUser y favoritos cuando tengamos la api funcionando y tenga sentido tener el id del usuario o si llego a mejorarlo harcodeado
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.registro} element={<Registro />} />
        <Route path={routes.producto} element={<Producto />} />
        <Route path={routes.reservaProducto} element={<ReservaProducto />} />
        <Route path={routes.favoritos} element={<Favoritos />} />
        <Route path={routes.reservaExitosa} element={<ReservaExitosa />} />
        <Route path={routes.confirmarCuenta} element={<CuentaConfirmada />} />
        <Route path={routes.reservasUser} element={<ReservasUser />} />
        <Route path={routes.admin} element={<Administracion />} />
        <Route path={routes.productoCreado} element={<ProductoCreado />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
