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

const Usuario = () => {
  const [datos, setDatos] = useState([]);

  const usuario = localStorage.getItem("usuario");
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
    window.location.href = "/login";
  };

  return (
    <div>
      <div>
        <button onClick={() => window.history.back()}>Atras</button>
      </div>
      <div>
        <button onClick={() => cerrarSesion()}>Cerrar Sesion</button>
      </div>
      <div>Usuario: {usuario}</div>
      <div>Viajes:</div>
      <div>
        {datos.map((c) => (
          <div key={c.id}>
            <ViajesUsuario id={c.id} />
            <button onClick={() => ir(c)}>Ir</button>
            <button onClick={() => borrar(c)}>Borrar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Usuario;
