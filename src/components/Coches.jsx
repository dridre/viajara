import { useEffect, useRef, useState } from "react";
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
  onSnapshot,
} from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import "../styles/Coches.css";
import "../styles/Travel.css";
import PersonasCoche from "./PersonasCoche";
import {
  FaCarSide,
  FaPen,
  FaCheck,
  FaTrashAlt,
  FaUserPlus,
  FaWindowClose,
} from "react-icons/fa";

const string = window.location.href.split("/");
const bd = string[3];
const bdPersonas = bd + "_personas";
const id = string[4];

const Coches = ({ id, name, description, location }) => {
  const [editando, cambiarEditando] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [newLocation, setNewLocation] = useState(location);
  const [persona, setPersona] = useState("");
  const [lista, setLista] = useState();

  useEffect(() => {
    onSnapshot(collection(db, bdPersonas), (snapshot) => {
      const p = snapshot.docs.map((documento) => {
        return { ...documento.data(), id: documento.id };
      });
      setLista(p);
    });
    /*   onSnapshot(collection(db, bd), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          window.location.reload();
        }
      });
    });*/
  }, []);

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

  const cocheIndividual = (id) => {
    window.location.href = window.location.href + "/" + id;
  };

  return (
    <div className="contenedorDatos">
      <div className="datosCoche">
        {editando ? (
          <form action="" onSubmit={actualizar} className="editarDatosCoche">
            <div className="datosEditar">
              <div className="editarNombreCoche">
                <input
                  class="form-control"
                  type="text"
                  name="nombre"
                  value={newName}
                  placeholder="Nombre del coche"
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="editarDescripcionCoche">
                <textarea
                  rows={4}
                  class="form-control"
                  type="text"
                  name="descripcion"
                  value={newDescription}
                  placeholder="Descripcion del coche"
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
              <div className="editarSalidaCoche">
                Salida:&nbsp;
                <input
                  class="form-control"
                  type="text"
                  name="location"
                  value={newLocation}
                  placeholder="Lugar de salida"
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              </div>
              <div className="añadirPersona">
                <div className="textoPersona">
                  <input
                    class="form-control"
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
                </div>
                <div>
                  <button
                    className="botonAgregarPersona"
                    onClick={agregarPersona}
                  >
                    <FaUserPlus />
                  </button>
                </div>
              </div>
            </div>
            <div className="botonesCoche">
              <button className="botonActualizar" type="submit">
                <FaCheck />
              </button>
              <button
                className="botonBorrar"
                onClick={() => {
                  cambiarEditando(false);
                }}
              >
                <FaWindowClose />
              </button>
            </div>
          </form>
        ) : (
          <div className="datosActualizados">
            <div className="nombreDescripcionLocalizacion">
              <h6 class="text-warning">
                <strong>{name}</strong>
              </h6>
              <h6 className="textoDescripcionCoche">{description}</h6>
              <div>
                Salida:&nbsp;
                <button
                  class="btn btn-outline-dark"
                  onClick={() => maps(location)}
                >
                  {location}
                </button>
              </div>
            </div>
            <div className="botonesCoche">
              <button className="botonIr" onClick={() => cocheIndividual(id)}>
                <FaCarSide />
              </button>
              <button
                className="botonEditar"
                onClick={() => cambiarEditando(!editando)}
              >
                <FaPen />
              </button>
              <button className="botonBorrar" onClick={() => eliminar(id)}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        )}
        <PersonasCoche id={id} />
      </div>
    </div>
  );
};

export default Coches;
