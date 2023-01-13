import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import puntero from './components/Media/puntero.png';
import Reservas from './components/Reservas/Reservas';
import ReservasUsuario from './components/Reservas/ReservasUsuario';
import Estadisticas from './components/Estadisticas/Estadisticas2';
import { useState } from 'react'


function App() {
  let [idSala, setIdSala] = useState('')

  return (
    <>
      <Router >
        <Routes>
          <Route path="/" element={<><Header /> <Main style={{
            cursor: `url(${puntero}),auto`
          }} setIdSala={setIdSala} idSala={idSala} /></>} />
          <Route path='/reservas/:id' element={<Reservas idSala={idSala} />} />
          <Route path='/mis-reservas' element={<ReservasUsuario />} />
          <Route path='/estadisticas' element={<><Header /> <Estadisticas /> </>} />
        </Routes>
      </Router>
      {/* <Estadisticas idSala={idSala}/> */}
    </>
  );
}

export default App;
