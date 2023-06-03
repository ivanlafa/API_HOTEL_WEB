import {Routes,Route} from 'react-router-dom'

import Habitaciones from './pages/habitaciones/Habitaciones'
import Reservas from './pages/reservas/Reservas'
import Notfound from './pages/Notfound'
import NavBar from './components/NavBar'
import Login from './pages/Login'

import './styles/Styles.css';


function App() {

  return (
    <>
      <NavBar/>
      <div className='container-fluid p-4'>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route path='/habitaciones' element={<Habitaciones/>}/>
          <Route path='/reservas' element={<Reservas/>}/>
          <Route path='*' element={<Notfound/>}/>


        </Routes>
      </div>
    </>
  )
}

export default App
