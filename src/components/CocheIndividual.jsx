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
import "../styles/CocheIndividual.css";
import PersonasCoche from "./PersonasCoche";
import ListaCoche from "./ListaCoche";
import ListaGastos from "./ListaGastos";
import GastosTotales from "./GastosTotales";

const string = window.location.href.split("/");
const bd = string[3];
const bdPersonas = bd + "_personas";
const id = string[4];

const CocheIndividual = () => {
  const [car, setCar] = useState([]);
  const [editando, cambiarEditando] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [persona, setPersona] = useState("");
  const [lista, setLista] = useState();

  useEffect(() => {
    onSnapshot(doc(db, bd, id), (doc) => {
      setCar(doc.data());
      setName(doc.data().name);
      setDescription(doc.data().description);
      setLocation(doc.data().location);
    });

    onSnapshot(collection(db, bdPersonas), (snapshot) => {
      const p = snapshot.docs.map((documento) => {
        return { ...documento.data(), id: documento.id };
      });
      setLista(p);
    });
  }, []);

  const actualizar = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, bd, id), {
      name: name,
      description: description,
      location: location,
    });
    cambiarEditando(false);
  };

  const maps = (location) => {
    const loc = location.replaceAll(" ", "+");
    window.open("https://www.google.es/maps/place/" + loc);
  };

  const agregarPersona = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, bdPersonas, persona), { coche: id });
    setPersona("");
  };

  return (
    <div>
      <div>
        <button onClick={() => window.history.back()}>Atras</button>
      </div>

      <div>
        {editando ? (
          <form action="" onSubmit={actualizar}>
            <div>
              <input
                type="text"
                name="nombre"
                value={name}
                placeholder={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                name="descripcion"
                value={description}
                placeholder={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              Salida:
              <input
                type="text"
                name="location"
                value={location}
                placeholder={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                list="data"
                onChange={(e) => setPersona(e.target.value)}
                placeholder="Añadir persona"
                value={persona}
              />
              <datalist id="data">
                {lista.map((c) => (
                  <option key={c.id} value={c.id} />
                ))}
              </datalist>
              <button onClick={agregarPersona}>+</button>
            </div>
            <button type="submit">Actualizar</button>
          </form>
        ) : (
          <div>
            <div>{name}</div>

            <div>{car.description}</div>
            <div>
              Salida:
              <button onClick={() => maps(car.location)}>{car.location}</button>
            </div>
            <button onClick={() => cambiarEditando(!editando)}>Editar</button>
          </div>
        )}
        <div>
          <PersonasCoche id={id} />
        </div>
        <div>
          <ListaCoche />
        </div>
        <div>
          <ListaGastos />
        </div>
        <div>
          <GastosTotales />
        </div>
      </div>
    </div>
  );
};

export default CocheIndividual;
