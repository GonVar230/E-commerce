import './App.css'
import TopBar from './Components/TopBar/TopBar';
import Hero from './Components/Hero/Hero';
import NavBar from './Components/NavBar/NavBar'
import { Routes, Route } from "react-router-dom";



function App() {

  return (
    <>
      <TopBar />
      <NavBar />
      <Hero />
    </>
  )
}

export default App
