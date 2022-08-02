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
    const mostrar = viaje.data().text1;
    await setDoc(doc(db, bdUsuario, bd), { mostrar: mostrar });
    setBoton(true);
  }

  return (
    <div className="contenedorCabecera">
      {existe ? (
        <div className="contenedorUsuarioCerrarSesion">
          <div className="contenedorUsuario">
            <div className="usuario">
              Usuario:
              <button
                class="btn btn-outline-warning"
                onClick={() => {
                  window.location.href = "/usuario";
                }}
              >
                {usuario}
              </button>
            </div>
            {donde ? (
              <div></div>
            ) : (
              <div className="añadirViaje">
                {boton ? (
                  <div class="text-secondary">Viaje añadido!</div>
                ) : (
                  <div>
                    <button
                      class="btn btn-success"
                      onClick={() => {
                        añadirViaje();
                      }}
                    >
                      Añadir
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="cerrarSesion">
            <button class="btn btn-danger" onClick={() => cerrarSesion()}>
              Salir
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="contenedorLogin">
            <div className="botonLogin">
              <button class="btn btn-primary" onClick={() => Login()}>
                Login
              </button>
            </div>
            <div className="botonLogin">
              <button class="btn btn-warning" onClick={() => Registro()}>
                Registro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cabecera;
