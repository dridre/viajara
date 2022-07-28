import React, { useEffect, useState } from "react";
import Registro from "./Registro";
import "../styles/Cabecera.css";

const string = window.location.href.split("/");
const bd = string[3];
const bdPersonas = bd + "_personas";

const Cabecera = ({ donde }) => {
  const [existe, setExiste] = useState();
  const Login = () => {
    window.location.href = "/login";
  };
  const Registro = () => {
    window.location.href = "/registro";
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setExiste(false);
  };

  useEffect(() => {
    existencia();
  }, []);

  const usuario = localStorage.getItem("usuario");

  const existencia = () => {
    if (usuario === null) {
      setExiste(false);
    } else {
      setExiste(true);
    }
  };

  return (
    <div>
      {existe ? (
        <div>
          <div>{donde ? <div></div> : <button>Añadir viaje</button>}</div>
          <div>Usuario: {usuario}</div>
          <div>
            <button onClick={() => cerrarSesion()}>Cerrar Sesion</button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <button onClick={() => Login()}>Login</button>
          </div>
          <div>
            <button onClick={() => Registro()}>Registro</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cabecera;
