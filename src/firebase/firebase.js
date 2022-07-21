import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  where,
  onSnapshot,
} from "firebase/firestore";
import db from "./firebaseConfig";

//CREA LA BASE DE DATOS

export const createWeb = async (bd) => {
  await setDoc(doc(db, bd, "coche_1"), {
    name: "coche_1",
    people: [],
    mostrar: true,
  });
};

//MUESTRA LOS COCHES

export const getCars = async (id) => {
  const result = await getDocs(
    query(collection(db, id), where("mostrar", "==", true))
  );
  return result;
};

//AÑADIR COCHES

export const addCar = async (id, name, data) => {
  await setDoc(doc(db, id, name), data);
};

//ACTUALIZAR COCHE
