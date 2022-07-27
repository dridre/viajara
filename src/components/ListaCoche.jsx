import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  onSnapshot,
  query,
  where,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import db from "../firebase/firebaseConfig";

const string = window.location.href.split("/");
const bd = string[3];
const bdPersonas = bd + "_personas";
const id = string[4];
const bdGastos = bd + "_gastos_" + id;

const ListaCoche = () => {
  const [personas, setPersonas] = useState("");
  const [nombre, setNombre] = useState("----");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [numGasto, setNumGasto] = useState();

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

    onSnapshot(doc(db, bdGastos, "contador"), (doc) => {
      setNumGasto(doc.data().number);
    });
  }, []);

  const llamada = async (e) => {
    const contador = await getDoc(doc(db, bdGastos, "contador"));
    if (contador.exists()) {
    } else {
      await setDoc(doc(db, bdGastos, "contador"), {
        number: 10,
      });
      await setDoc(doc(db, bdGastos, "Total"), {
        pagado: 0,
      });
    }
  };

  llamada();

  const añadirGasto = async (e) => {
    e.preventDefault();
    const num = "gasto_" + numGasto;
    await setDoc(doc(db, bdGastos, num), {
      nombre: nombre,
      descripcion: descripcion,
      precio: parseInt(precio),
    });

    await updateDoc(doc(db, bdGastos, "contador"), { number: increment(1) });

    const persona = await getDoc(doc(db, bdGastos, nombre));
    if (persona.exists()) {
      await updateDoc(doc(db, bdGastos, nombre), {
        pagado: increment(parseInt(precio)),
      });
      await updateDoc(doc(db, bdGastos, "Total"), {
        pagado: increment(parseInt(precio)),
      });
    } else {
      await setDoc(doc(db, bdGastos, nombre), {
        pagado: parseInt(precio),
      });
      await updateDoc(doc(db, bdGastos, "Total"), {
        pagado: increment(parseInt(precio)),
      });
    }

    setNombre("----");
    setDescripcion("");
    setPrecio("");
  };

  return (
    personas.length > 0 && (
      <div>
        <form action="" onSubmit={añadirGasto}>
          <select value={nombre} onChange={(e) => setNombre(e.target.value)}>
            <option value="----">----</option>
            {personas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="€"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
          <button type="submit">+</button>
        </form>
      </div>
    )
  );
};

export default ListaCoche;
