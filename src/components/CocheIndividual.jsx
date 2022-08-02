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
import "../styles/Travel.css";
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
      <div className="atrasCerrarSesion">
        <button
          class="btn btn-outline-info"
          onClick={() => window.history.back()}
        >
          Atras
        </button>
      </div>
      <div className="informacion">
        <div className="contenedorCoche">
          <div className="contenedorDatos">
            <div className="datosCoche">
              {editando ? (
                <form
                  action=""
                  onSubmit={actualizar}
                  className="editarDatosCoche"
                >
                  <div className="datosEditar">
                    <div className="editarNombreCoche">
                      <input
                        class="form-control"
                        type="text"
                        name="nombre"
                        value={name}
                        placeholder="Nombre del coche"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="editarDescripcionCoche">
                      <textarea
                        rows={4}
                        class="form-control"
                        type="text"
                        name="descripcion"
                        value={description}
                        placeholder="Descripcion del coche"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="editarSalidaCoche">
                      Salida:&nbsp;
                      <input
                        class="form-control"
                        type="text"
                        name="location"
                        value={location}
                        placeholder={location}
                        onChange={(e) => setLocation(e.target.value)}
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
                    <h6 className="textoDescripcionCoche">{car.description}</h6>
                    <div>
                      Salida:&nbsp;
                      <button
                        class="btn btn-outline-dark"
                        onClick={() => maps(car.location)}
                      >
                        {car.location}
                      </button>
                    </div>
                  </div>
                  <div className="botonesCoche">
                    <button
                      className="botonEditar"
                      onClick={() => cambiarEditando(!editando)}
                    >
                      {" "}
                      <FaPen />
                    </button>
                  </div>
                </div>
              )}

              <div>
                <PersonasCoche id={id} />
              </div>
            </div>
          </div>
        </div>
        <div className="gastosVarios">
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
    </div>
  );
};

export default CocheIndividual;
