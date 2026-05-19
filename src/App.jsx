import './App.css'
import TopBar from './Components/TopBar/TopBar'
import NavBar from './Components/NavBar/NavBar'
import { Routes, Route } from "react-router-dom"
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import NotFound from './Components/NotFound/NotFound'
import Help from './Components/Help/Help'

function App() {
  return (
    <>
      <TopBar />
      <NavBar />
      
      <Routes>
        <Route path="/" element={<><Home /></>  } />
        <Route path="/productos" element={<></>} />
        <Route path="/ayuda" element={<><Help /></>} />
        <Route path="/*" element={<> <NotFound /> </> } />
      </Routes>

      <Footer />
    </>

    
  )
}

export default App