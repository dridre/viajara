import { useRef, useState } from "react";
import "../styles/Coches.css";
import {
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import "../styles/Coches.css";
import PersonasCoche from "./PersonasCoche";

const bd = window.location.href.slice(-5);
const bdPersonas = window.location.href.slice(-5) + "_personas";

const Coches = ({ id, name, description, location }) => {
  const [editando, cambiarEditando] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [newLocation, setNewLocation] = useState(location);
  const [persona, setPersona] = useState("");

  const actualizar = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, bd, id), {
      name: newName,
      description: newDescription,
      location: newLocation,
    });
    cambiarEditando(false);
  };

  const eliminar = async (id) => {
    const q = await getDocs(
      query(collection(db, bdPersonas), where("coche", "==", id))
    );
    q.forEach((docu) => {
      updateDoc(doc(db, bdPersonas, docu.id), {
        coche: "",
      });
    });
    await deleteDoc(doc(db, bd, id), {
      name: newName,
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
    <div className="contenedorDatos">
      {editando ? (
        <form action="" onSubmit={actualizar}>
          <div>
            <input
              type="text"
              name="nombre"
              value={newName}
              placeholder={name}
              onChange={(e) => setNewName(e.target.value)}
            />
            <div>
              <input
                type="text"
                name="descripcion"
                value={newDescription}
                placeholder={description}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div>
              Salida:
              <input
                type="text"
                name="location"
                value={newLocation}
                placeholder={location}
                onChange={(e) => setNewLocation(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Añadir persona"
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
              />
              <button onClick={agregarPersona}>+</button>
            </div>
          </div>
          <button type="submit">Actualizar</button>
        </form>
      ) : (
        <div>
          <div>{name}</div>
          <div>{description}</div>
          <div>
            Salida:
            <button onClick={() => maps(location)}>{location}</button>
          </div>

          <button onClick={() => cambiarEditando(!editando)}>Editar</button>
          <button onClick={() => eliminar(id)}>Borrar</button>
        </div>
      )}
      <PersonasCoche id={id} />
    </div>
  );
};

export default Coches;
