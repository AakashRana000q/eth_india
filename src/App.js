import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
