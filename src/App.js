import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import BotonInicial from "./components/BotonInicial";
import Travel from "./components/Travel";
import Error from "./components/Error";
import CocheIndividual from "./components/CocheIndividual";
import Test from "./components/Test";
import Cabecera from "./components/Cabecera";
import Registro from "./components/Registro";
import Login from "./components/Login";
import Usuario from "./components/Usuario";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<BotonInicial />} />
          <Route path="/:id" exact element={<Travel />} />
          <Route path="*" element={<Error />} />
          <Route path="/:id/error" element={<Error />} />
          <Route path="/:id/:name" exact element={<CocheIndividual />} />
          <Route path="/test" exact element={<Test />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/registro" exact element={<Registro />} />
          <Route path="/usuario" exact element={<Usuario />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
