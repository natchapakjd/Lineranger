import React from 'react'
import Navbar from './components/Navbar'
import Layout from './pages/Layout'
import Login from './pages/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Topup from './pages/Topup'
import Register from './pages/Register'
import Shop from './pages/Shop'
import "./App.css"
import ProductDetails from './pages/ProductDetails'
import Footer from './components/Footer'
import ProtectRoute from './ProtectRoute'
function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar/>
        
        <Routes>
          <Route >
            <Route path="/" element={<Layout/>}/>
            <Route path="topup" element={ProtectRoute(<Topup/>)}/>
            <Route path="login" element={<Login/>}/> 
            <Route path="register" element={<Register/>}/>  
            <Route path="shop" element={<Shop/>}/>  
            <Route path="shop/:id" element={ProtectRoute(<ProductDetails/>)}/>  
            
            
          </Route>

        </Routes>
        <Footer/>
      </BrowserRouter>
 
     
    </>
  )
}

export default App
