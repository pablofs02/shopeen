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

/**
 *  This functions returns the main component of the application with the routes and the context providers
 * @returns The main component of the application
 */
function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <FilterProvider>
          <Navbar />
          <Routes>
            <Route path="/shopeen/" element={<Container><Home /></Container>} />
            <Route path="/shopeen/about" element={<About />}></Route>
            <Route path="/shopeen/store" element={<Container><Store /></Container>}></Route>
            <Route path="/shopeen/help" element={<Help />}></Route>
            <Route path="/shopeen/purchase" element={<Container><Purchase/></Container>}></Route>
            <Route path="/shopeen/product/:id" element={<Product></Product>}></Route>
          </Routes>
        </FilterProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
