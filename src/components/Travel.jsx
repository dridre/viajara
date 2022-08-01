import {
  collection,
  onSnapshot,
  query,
  setDoc,
  where,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase/firebaseConfig";
import "../styles/Travel.css";
import Cabecera from "./Cabecera";
import Coches from "./Coches";
import ListaPersonas from "./ListaPersonas";
import { FaPen, FaCheck } from "react-icons/fa";

const bd = window.location.href.slice(-5);
const bdPersonas = window.location.href.slice(-5) + "_personas";

const Travel = () => {
  const [nameCars, setNameCars] = useState([]);
  const [numCars, setNumCars] = useState();
  const [editando, cambiarEditando] = useState(false);
  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();

  const usuario = localStorage.getItem("usuario");
  const bdUsuario = "viajes_" + usuario;

  useEffect(() => {
    onSnapshot(
      query(collection(db, bd), where("mostrar", "==", true)),
      (snapshot) => {
        const arreglo = snapshot.docs.map((documento) => {
          return { ...documento.data(), id: documento.id };
        });
        setNameCars(arreglo);
      }
    );
    onSnapshot(doc(db, bd, "title"), (doc) => {
      setTitulo(doc.data().text1);
    });
    onSnapshot(doc(db, bd, "subtitle"), (doc) => {
      setDescripcion(doc.data().text);
    });
    numeroCoche();
    existe();
  }, []);

  localStorage.setItem("url", bd);

  const existe = async () => {
    const llamada = await getDoc(doc(db, bd, "title"));
    if (llamada.exists()) {
    } else {
      window.location.href = window.location.href + "/error";
    }
  };

  const numeroCoche = async () => {
    const contador = await getDoc(doc(db, bd, "contador"));
    setNumCars(contador.data().number);
  };

  const agregarCoche = async () => {
    const car = "coche_" + numCars;
    await setDoc(doc(db, bd, car), {
      name: car,
      mostrar: true,
      description: "",
      location: "Localizacion",
    });
    await updateDoc(doc(db, bd, "contador"), { number: increment(1) });
    setNumCars(numCars + 1);
  };

  const actualizarCabecera = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, bd, "title"), {
      text1: titulo,
    });
    await updateDoc(doc(db, bd, "subtitle"), {
      text: descripcion,
    });

    cambiarEditando(false);
  };

  return (
    nameCars.length > -1 && (
      <div>
        <div>
          <Cabecera />
        </div>
        <div className="nombreViaje">
          {editando ? (
            <div>
              <form
                className="editarNombreViaje"
                action=""
                onSubmit={actualizarCabecera}
              >
                <div className="editarTituloDescripcion">
                  <div className="editarTitulo">
                    <input
                      class="form-control"
                      type="text"
                      name="titulo"
                      value={titulo}
                      placeholder="Titulo del viaje"
                      onChange={(e) => setTitulo(e.target.value)}
                    />
                  </div>
                  <div className="editarDescripcion">
                    <textarea
                      class="form-control"
                      rows="6"
                      type="text"
                      name="descripcion"
                      value={descripcion}
                      placeholder="Descripcion del viaje"
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button className="botonActualizar" type="submit">
                    <FaCheck />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="tituloDescripcion">
              <div>
                <h1>{titulo}</h1>
                <h6 className="textoDescripcion">{descripcion}</h6>
              </div>
              <button
                className="botonEditar"
                onClick={() => cambiarEditando(!editando)}
              >
                <FaPen />
              </button>
            </div>
          )}
        </div>

        <div className="contenedorCoche">
          {nameCars.map((c) => (
            <Coches
              key={c.id}
              id={c.id}
              name={c.name}
              description={c.description}
              location={c.location}
              mostrar={true}
            />
          ))}
        </div>
        <div>
          <button className="agregar" onClick={() => agregarCoche()}>
            +
          </button>
        </div>
        <ListaPersonas />
      </div>
    )
  );
};

export default Travel;
