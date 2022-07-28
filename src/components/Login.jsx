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

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

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
    <div>
      <form action="" onSubmit={login}>
        <div>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type={passwordShown ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={togglePassword}>Show Password</button>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
