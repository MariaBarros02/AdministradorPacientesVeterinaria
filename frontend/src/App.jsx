import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import Login from "./paginas/Login"
import RegistrarCuenta from "./paginas/RegistrarCuenta"
import CambiarPassword from "./paginas/CambiarPassword"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          <Route path="crear-cuenta" element={<RegistrarCuenta/>}/>
          <Route path="cambiar-clave" element={<CambiarPassword/>}/>
          <Route path="confirmar-cuenta" element={<ConfirmarCuenta/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
