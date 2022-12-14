import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dsign from "./pages/Dsign";
import Psign from "./pages/Psign";
import Dlog from "./pages/Dlog";
import Plog from "./pages/Plog";
import Phome from "./pages/Phome";
import Dhome from "./pages/Dhome";
import Records from "./pages/Records";

import "./style.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Signup />} />
          <Route path="dsign" element={<Dsign />} />
          <Route path="psign" element={<Psign />} />
          <Route path="dlog" element={<Dlog />} />
          <Route path="plog" element={<Plog />} />
          <Route path="Phome" element={<Phome />} />
          <Route path="dhome" element={<Dhome />} />
          <Route path="records" element={<Records />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
