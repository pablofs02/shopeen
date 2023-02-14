import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return <BrowserRouter>
    <Navbar></Navbar>
    <h1>Contenido</h1>
  </BrowserRouter>
}

export default App
