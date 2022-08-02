import {
  collection,
  getDocs,
  query,
  where,
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase/firebaseConfig";
import ViajesUsuario from "./ViajesUsuario";
import "../styles/Usuario.css";

const Usuario = () => {
  const [datos, setDatos] = useState([]);

  const usuario = localStorage.getItem("usuario");
  const url = localStorage.getItem("url");
  const bdUsuario = "viajes_" + usuario;

  useEffect(() => {
    onSnapshot(
      query(collection(db, bdUsuario), where("mostrar", "!=", "")),
      (snapshot) => {
        const p = snapshot.docs.map((documento) => {
          return { ...documento.data(), id: documento.id };
        });
        setDatos(p);
      }
    );

    noUsuario();
  }, []);

  const noUsuario = () => {
    if (usuario === null) {
      window.location.href = "/login";
    }
  };

  const ir = (c) => {
    window.location.href = "/" + c.id;
  };

  const borrar = async (c) => {
    await deleteDoc(doc(db, bdUsuario, c.id));
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    if (url === "usuario") {
      window.location.href = "/";
    } else {
      window.history.back();
    }
  };

  const atras = () => {
    if (url === "usuario") {
      window.location.href = "/";
    } else {
      window.history.back();
    }
  };

  return (
    <div>
      <div className="atrasCerrarSesion">
        <div>
          <button class="btn btn-outline-info" onClick={() => atras()}>
            Atras
          </button>
        </div>
        <div>
          <button class="btn btn-danger" onClick={() => cerrarSesion()}>
            Salir
          </button>
        </div>
      </div>
      <div className="usuarioViajes">
        <div>Usuario: {usuario}</div>
        <div>Viajes:</div>
      </div>
      <div className="info">
        {datos.map((c) => (
          <div key={c.id} className="viaje">
            <ViajesUsuario id={c.id} />
            <div className="irBorrar">
              <div className="ir">
                <button class="btn btn-outline-warning" onClick={() => ir(c)}>
                  Ir
                </button>
              </div>
              <div>
                <button
                  class="btn btn-outline-danger"
                  onClick={() => borrar(c)}
                >
                  Borrar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Usuario;
