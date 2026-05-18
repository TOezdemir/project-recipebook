import Header from "./Header"
import Hero from "./Hero"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"


export default function Layout(){
    return(
        <div className="min-h-screen flex flex-col">
        <Header/>
        <Hero/>
        <div className="container mx-auto flex-1">
          <Outlet/>  
        </div>
        <Footer/>
        </div>
    )
}