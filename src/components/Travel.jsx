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
import Coches from "./Coches";
import ListaPersonas from "./ListaPersonas";

const bd = window.location.href.slice(-5);
const bdPersonas = window.location.href.slice(-5) + "_personas";

const Travel = () => {
  const [nameCars, setNameCars] = useState([]);
  const [numCars, setNumCars] = useState();

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
    numeroCoche();
  }, []);

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

  return (
    nameCars.length > -1 && (
      <div>
        <div className="contenedorCoche">
          {nameCars.map((c) => (
            <Coches
              key={c.id}
              id={c.id}
              name={c.name}
              description={c.description}
              location={c.location}
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
