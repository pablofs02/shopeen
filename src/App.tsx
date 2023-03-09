import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap/";
import About from "./pages/About";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Store from "./pages/Store";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Container><Home /></Container>} />
        <Route path="/about" element={<About />}></Route>
        <Route path="/store" element={<Container><Store /></Container>}></Route>
        <Route path="/help" element={<Help />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
