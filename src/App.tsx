// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap/";
import About from "./components/About";
import Help from "./components/Help";
import Home from "./components/Home";
import Store from "./components/Store";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}></Route>
        <Route path="/store" element={<Store />}></Route>
        <Route path="/help" element={<Help />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
