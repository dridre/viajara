import React from "react";
import "../styles/BotonInicial.css";
import { setDoc, doc } from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import Cabecera from "./Cabecera";

const BotonInicial = () => {
  function makeid() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  localStorage.setItem("url", "usuario");

  const bd = makeid();

  const comenzar = async () => {
    await setDoc(doc(db, bd, "coche_10"), {
      name: "coche_10",
      mostrar: true,
      description: "",
      location: "Localizacion",
    });
    await setDoc(doc(db, bd, "contador"), {
      number: 11,
    });
    await setDoc(doc(db, bd, "title"), {
      text1: "Viaje a ...",
    });
    await setDoc(doc(db, bd, "subtitle"), {
      text: "Descripcion del viaje",
    });

    window.location.href = "/" + bd;
  };

  return (
    <div className="contenedorBoton">
      <div>
        <Cabecera donde={true} />
      </div>
      <div>
        <button className="botonInicial" onClick={comenzar}>
          Nuevo viaje
        </button>
      </div>
    </div>
  );
};

export default BotonInicial;
