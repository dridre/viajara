import {
  collection,
  getDoc,
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
        console.log(p);
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

  return (
    <div>
      <div>Usuario: {usuario}</div>
      <div>Viajes:</div>
      <div>
        {datos.map((c) => (
          <div key={c.id}>
            {c.mostrar}
            <button onClick={() => ir(c)}>Ir</button>
            <button onClick={() => borrar(c)}>Borrar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Usuario;
