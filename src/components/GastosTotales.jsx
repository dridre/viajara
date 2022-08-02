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
  getDocs,
} from "firebase/firestore";
import db from "../firebase/firebaseConfig";

const string = window.location.href.split("/");
const bd = string[3];
const bdPersonas = bd + "_personas";
const id = string[4];
const bdGastos = bd + "_gastos_" + id;

const DivisionGastos = () => {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, bdGastos), where("pagado", "!=", 0)),
      (snapshot) => {
        const p = snapshot.docs.map((documento) => {
          return { ...documento.data(), id: documento.id };
        });
        setGastos(p);
      }
    );
  }, []);

  return (
    gastos.length > 0 && (
      <div className="gastosTotales">
        {gastos.map((c) => (
          <div key={c.id} value={c.id}>
            {c.id != "Total" ? (
              <div className="gastoPorPersona">
                <div class="text-info">{c.id}</div>
                <div class="text-primary"> {c.pagado} €</div>
              </div>
            ) : (
              <div className="gastoPorPersona">
                <div class="text-warning">{c.id}</div>
                <div class="text-warning"> {c.pagado} €</div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  );
};

export default DivisionGastos;
