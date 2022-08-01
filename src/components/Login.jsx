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
import "../styles/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  if (localStorage.getItem("usuario") !== null) {
    window.history.back();
  }

  const url = localStorage.getItem("url");

  const togglePassword = (e) => {
    e.preventDefault(e);
    setPasswordShown(!passwordShown);
  };

  const login = async (e) => {
    e.preventDefault();
    const user = await getDoc(doc(db, "usuarios", usuario));

    if (user.exists()) {
      const contraseña = user.data().password;

      if (contraseña === password) {
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("password", password);
        window.location.href = "/" + url;
      } else {
        alert("Contraseña incorrecta");
        setPassword("");
      }
    } else {
      alert("Usuario no existe");
      setUsuario("");
      setPassword("");
    }
  };

  return (
    <div className="contenedorDatosLogin">
      <div className="atras">
        <button
          class="btn btn-outline-info"
          onClick={() => window.history.back()}
        >
          Atras
        </button>
      </div>
      <form action="" onSubmit={login} className="campo">
        <div className="usuarioContraseña">
          <div className="usuario2">
            <input
              class="form-control"
              placeholder="Usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="contraseña">
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Contraseña"
              class="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={togglePassword}>
              {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="loginRegistro">
          <div className="login">
            <button class="btn btn-success" type="submit">
              Login
            </button>
          </div>
          <div className="registro">
            <button
              class="btn btn-warning"
              onClick={() => (window.location.href = "/registro")}
            >
              Registro
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
