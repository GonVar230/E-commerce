import './App.css'
import TopBar from './Components/TopBar/TopBar'
import NavBar from './Components/NavBar/NavBar'
import { Routes, Route } from "react-router-dom"
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import NotFound from './Components/NotFound/NotFound'
import Help from './Components/Help/Help'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer'
import Cart from './Components/Cart/Cart'
import Checkout from './Components/Checkout/Checkout'
import Payment from './Components/Payment/Payment'

function App() {
    return (
        <>
            <TopBar />
            <NavBar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<ItemListContainer />} />
                <Route path="/productos/:id" element={<ItemDetailContainer />} />
                <Route path="/ayuda" element={<Help />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pago" element={<Payment />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App;