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
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registro = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const togglePassword = (e) => {
    e.preventDefault(e);
    setPasswordShown(!passwordShown);
  };

  const togglePassword2 = (e) => {
    e.preventDefault(e);
    setPasswordShown2(!passwordShown2);
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();
    const nombre = await getDoc(doc(db, "usuarios", usuario));
    if (nombre.exists()) {
      alert("Usuario ya existe");
    } else if (password !== password2) {
      alert("Contaseñas no coinciden");
      setPassword("");
      setPassword2("");
    }
    if (nombre.exists() === false && password === password2) {
      await setDoc(doc(db, "usuarios", usuario), {
        name: usuario,
        password: password,
      });
      const viajesUsuario = "viajes_" + usuario;
      await setDoc(doc(db, viajesUsuario, "0"), {});
      localStorage.setItem("usuario", usuario);
      localStorage.setItem("password", password);
      window.history.back();
    }
  };

  return (
    <div>
      <div className="atras">
        <button
          class="btn btn-outline-info"
          onClick={() => window.history.back()}
        >
          Atras
        </button>
      </div>
      <form action="" onSubmit={registrarUsuario} className="campo">
        <div className="usuarioContraseña">
          <div className="usuario2">
            <input
              placeholder="Usuario"
              class="form-control"
              type="text"
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="contraseña">
            <input
              placeholder="Cotraseña"
              class="form-control"
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={togglePassword}>
              {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="contraseña">
            <input
              placeholder="Repetir contraseña"
              class="form-control"
              type={passwordShown2 ? "text" : "password"}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <button type="button" onClick={togglePassword2}>
              {passwordShown2 ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="loginRegistro">
          <div className="login">
            <button
              class="btn btn-primary"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
          </div>
          <div className="registro">
            <button class="btn btn-success" type="submit">
              Registrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registro;
