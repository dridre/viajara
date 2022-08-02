import {
  collection,
  deleteDoc,
  onSnapshot,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase/firebaseConfig";
import { FaUserPlus, FaTrashAlt } from "react-icons/fa";

const bd = window.location.href.slice(-5);
const bdPersonas = window.location.href.slice(-5) + "_personas";

const ListaPersonas = () => {
  const [conCoche, setConCoche] = useState([]);
  const [sinCoche, setSinCoche] = useState([]);
  const [persona, setPersona] = useState("");

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

  const agregarPersona = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, bdPersonas, persona), { coche: "" });
    setPersona("");
  };

  const eliminar = async (c) => {
    await deleteDoc(doc(db, bdPersonas, c));
  };

  return (
    conCoche.length > -1 && (
      <div className="listaPersonas">
        <div className="tododentro">
          <div className="inputAñadirPersona">
            <input
              class="form-control"
              type="text"
              name="persona"
              value={persona}
              placeholder="Añadir persona"
              onChange={(e) => setPersona(e.target.value)}
            />
            <button className="botonAgregarPersona" onClick={agregarPersona}>
              <FaUserPlus />
            </button>
          </div>
          <div className="listaCoche">
            <h5> Sin coche:</h5>
            {sinCoche.map((c) => (
              <div class="text-danger" key={c.id}>
                {c.id}
                <button className="botonBorrar" onClick={() => eliminar(c.id)}>
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
          <div className="listaCoche">
            <h5> Con coche:</h5>
            {conCoche.map((c) => (
              <div class="text-success" key={c.id}>
                {c.id}
                <button className="botonBorrar" onClick={() => eliminar(c.id)}>
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ListaPersonas;
