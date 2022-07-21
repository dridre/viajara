import {
  collection,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase/firebaseConfig";

const bdPersonas = window.location.href.slice(-5) + "_personas";

const PersonasCoche = ({ id }) => {
  const [personas, setPersonas] = useState([]);
  const [valor, setValor] = useState("");

  useEffect(() => {
    onSnapshot(
      query(collection(db, bdPersonas), where("coche", "==", id)),
      (snapshot) => {
        const p = snapshot.docs.map((documento) => {
          return { ...documento.data(), id: documento.id };
        });
        setPersonas(p);
      }
    );
  }, []);

  const quitarCoche = async () => {
    await updateDoc(doc(db, bdPersonas, valor), {
      coche: "",
    });
  };

  return (
    personas.length > -1 && (
      <div>
        <div>
          Personas a bordo:
          {personas.map((c) => (
            <button
              key={c.id}
              value={c.id}
              onClick={() => setValor(c.id)}
              onDoubleClick={() => {
                quitarCoche();
              }}
            >
              {c.id}
            </button>
          ))}
        </div>
      </div>
    )
  );
};

export default PersonasCoche;
