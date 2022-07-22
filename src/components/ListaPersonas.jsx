import {
  collection,
  deleteDoc,
  onSnapshot,
  query,
  where,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase/firebaseConfig";

const bd = window.location.href.slice(-5);
const bdPersonas = window.location.href.slice(-5) + "_personas";

const ListaPersonas = () => {
  const [conCoche, setConCoche] = useState([]);
  const [sinCoche, setSinCoche] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, bdPersonas), where("coche", "!=", "")),
      (snapshot) => {
        const p = snapshot.docs.map((documento) => {
          return { ...documento.data(), id: documento.id };
        });
        setConCoche(p);
      }
    );

    onSnapshot(
      query(collection(db, bdPersonas), where("coche", "==", "")),
      (snapshot) => {
        const p = snapshot.docs.map((documento) => {
          return { ...documento.data(), id: documento.id };
        });
        setSinCoche(p);
      }
    );
  }, []);

  const eliminar = async (c) => {
    await deleteDoc(doc(db, bdPersonas, c));
  };

  return (
    conCoche.length > -1 && (
      <div>
        <div>
          Con coche:
          {conCoche.map((c) => (
            <div key={c.id}>
              {c.id}
              <button onClick={() => eliminar(c.id)}>X</button>
            </div>
          ))}
        </div>
        <div>
          Sin coche:
          {sinCoche.map((c) => (
            <div key={c.id}>
              {c.id}
              <button onClick={() => eliminar(c.id)}>X</button>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default ListaPersonas;
