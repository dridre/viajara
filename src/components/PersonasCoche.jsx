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

const string = window.location.href.split("/");
const bd = string[3];
const bdPersonas = bd + "_personas";

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
      <div className="contenedorPersonasCoche">
        <div>
          Personas a bordo:
          <div className="personasCoche">
            {personas.map((c) => (
              <button
                class="btn btn-outline-info personas"
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
      </div>
    )
  );
};

export default PersonasCoche;
