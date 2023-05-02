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
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <FilterProvider>
          <Navbar />
          <Routes>
            <Route path="/ProyIU" element={<Container><Home /></Container>} />
            <Route path="/ProyIU/about" element={<About />}></Route>
            <Route path="/ProyIU/store" element={<Container><Store /></Container>}></Route>
            <Route path="/ProyIU/help" element={<Help />}></Route>
            <Route path="/ProyIU/purchase" element={<Container><Purchase/></Container>}></Route>
            <Route path="/ProyIU/product/:id" element={<Product></Product>}></Route>
          </Routes>
        </FilterProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
