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

const ViajesUsuario = ({ id }) => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, id), where("text1", "!=", "")),
      (snapshot) => {
        const p = snapshot.docs.map((documento) => {
          return { ...documento.data(), id: documento.id };
        });
        setDatos(p);
      }
    );
  }, []);

  return (
    <div>
      <div>
        {datos.map((c) => (
          <div key={id}>{c.text1}</div>
        ))}
      </div>
    </div>
  );
};

export default ViajesUsuario;
