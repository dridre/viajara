import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  onSnapshot,
  query,
  where,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import db from "../firebase/firebaseConfig";

const string = window.location.href.split("/");
const bd = string[3];
const bdPersonas = bd + "_personas";
const id = string[4];
const bdGastos = bd + "_gastos_" + id;

const ListaGastos = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, bdGastos), where("precio", "!=", "")),
      (snapshot) => {
        const p = snapshot.docs.map((documento) => {
          return { ...documento.data(), id: documento.id };
        });
        setLista(p);
      }
    );
  }, []);

  const eliminar = async (c) => {
    await deleteDoc(doc(db, bdGastos, c.id));
    await updateDoc(doc(db, bdGastos, c.nombre), {
      pagado: increment(-parseInt(c.precio)),
    });
    await updateDoc(doc(db, bdGastos, "Total"), {
      pagado: increment(-parseInt(c.precio)),
    });
  };

  return (
    <div>
      Lista de gastos:
      {lista.map((c) => (
        <div key={c.id}>
          <div>{c.nombre}</div>
          <div>{c.descripcion}</div>
          <div>{c.precio} €</div>
          <button onClick={() => eliminar(c)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default ListaGastos;
