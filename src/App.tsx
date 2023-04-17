import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap/";
import About from "./pages/About";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Store from "./pages/Store";
import { GlobalProvider } from "./context/GlobalContext";
import { FilterProvider } from "./context/FilterContext";
import Purchase from "./pages/Purchase";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <FilterProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Container><Home /></Container>} />
            <Route path="/about" element={<About />}></Route>
            <Route path="/store" element={<Container><Store /></Container>}></Route>
            <Route path="/help" element={<Help />}></Route>
            <Route path="/purchase" element={<Purchase/>}></Route>
          </Routes>
        </FilterProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
