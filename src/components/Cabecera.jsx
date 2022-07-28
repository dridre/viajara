import {
  collection,
  getDoc,
  query,
  where,
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase/firebaseConfig";
import "../styles/Cabecera.css";

const string = window.location.href.split("/");
const bd = string[3];
const bdPersonas = bd + "_personas";

const Cabecera = ({ donde }) => {
  const [boton, setBoton] = useState(true);
  const usuario = localStorage.getItem("usuario");
  const bdUsuario = "viajes_" + usuario;

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
    existenciaViaje();
  }, []);

  const existencia = () => {
    if (usuario === null) {
      setExiste(false);
    } else {
      setExiste(true);
    }
  };

  const existenciaViaje = async () => {
    const existe = await getDoc(doc(db, bdUsuario, bd));
    setBoton(existe.exists());
  };

  async function añadirViaje() {
    const viaje = await getDoc(doc(db, bd, "title"));
    const mostrar = viaje.data().text;
    await setDoc(doc(db, bdUsuario, bd), { mostrar: mostrar });
    setBoton(true);
  }

  return (
    <div>
      {existe ? (
        <div>
          <div>
            {donde ? (
              <div></div>
            ) : (
              <div>
                {boton ? (
                  <div></div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        añadirViaje();
                      }}
                    >
                      Añadir Viaje
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          Usuario:{" "}
          <button
            onClick={() => {
              window.location.href = "/usuario";
            }}
          >
            {usuario}
          </button>
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
