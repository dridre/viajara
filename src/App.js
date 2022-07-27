import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BotonInicial from "./components/BotonInicial";
import Travel from "./components/Travel";
import Error from "./components/Error";
import CocheIndividual from "./components/CocheIndividual";
import Test from "./components/Test";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<BotonInicial />} />
          <Route path="/:id" exact element={<Travel />} />
          <Route path="*" element={<Error />} />
          <Route path="/:id/:name" exact element={<CocheIndividual />} />
          <Route path="/test" exact element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
