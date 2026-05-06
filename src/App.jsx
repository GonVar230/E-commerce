import './App.css'
import TopBar from './Components/TopBar/TopBar'
import NavBar from './Components/NavBar/NavBar'
import Hero from './Components/Hero/Hero'
import { Routes, Route } from "react-router-dom"
import CarouselCards from './Components/CarouselCards/CarouselCards'
import StoreStats from './Components/StoreStats/StoreStats'
import Footer from './Components/Footer/Footer'

function App() {
  return (
    <>
      <TopBar />
      <NavBar />
      
      <Routes>
        <Route path="/" element={
          <>
            <Hero />  
            <CarouselCards />
            <StoreStats />
          </>  
        } />
        <Route path="/productos" element={<div>Productos</div>} />
        <Route path="/contacto" element={<div>Contacto</div>} />
      </Routes>

      <Footer />
    </>

    
  )
}

export default App