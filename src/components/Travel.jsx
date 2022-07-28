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

const bd = window.location.href.slice(-5);
const bdPersonas = window.location.href.slice(-5) + "_personas";

const Travel = () => {
  const [nameCars, setNameCars] = useState([]);
  const [numCars, setNumCars] = useState();
  const [editando, cambiarEditando] = useState(false);
  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();

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
      setTitulo(doc.data().text);
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
      text: titulo,
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
        <div>
          {editando ? (
            <div>
              <form action="" onSubmit={actualizarCabecera}>
                <div>
                  <input
                    type="text"
                    name="titulo"
                    value={titulo}
                    placeholder={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="descripcion"
                    value={descripcion}
                    placeholder={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>
                <div>
                  <button type="submit">Actualizar</button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div>{titulo}</div>
              <div>{descripcion}</div>
              <button onClick={() => cambiarEditando(!editando)}>Editar</button>
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
