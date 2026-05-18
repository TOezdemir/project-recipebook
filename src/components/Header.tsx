import { NavLink } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { useUserContext } from "../context/userContext"
import { useState } from "react"

export default function Header(){
  const {user, setUser} = useUserContext()
  const handleLogoutClick = () =>{
    setUser(null)
    supabase.auth.signOut()
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
    return (
      <header>
        <div className="bg-yellow-400 h-8"></div>
        <div className="container mx-auto py-4 flex flex-col md:flex-row items-center justify-between">
          <NavLink to="/" className="flex items-center mb-4 md:mb-0">
            <span className="font-light text-xl">WG: Rezepte</span>
          </NavLink>
          <button 
            className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none" 
            onClick={toggleMobileMenu}
          >
            {/* Burger-Menü Icon */}
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
              )}
            </svg>
          </button>
          <nav 
            className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0`}
          >
            <NavLink to="/" className="font-bold hover:text-gray-600 block md:inline">Home</NavLink>
            <NavLink to="/rezepte" className="font-bold hover:text-gray-600 block md:inline">Rezepte</NavLink>
            <NavLink to="/ueber-die-seite" className="font-bold hover:text-gray-600 block md:inline">Über die Seite!</NavLink>
            {!user && <NavLink to="/Login" className="font-bold hover:text-gray-600 block md:inline">Anmelden / Registrieren</NavLink>}
            {user && <NavLink to="/neues-rezept-anlegen" className="font-bold hover:text-gray-600 block md:inline">Neues Rezept!</NavLink>}
            {user && <button onClick={handleLogoutClick} className="font-bold hover:text-gray-600 block md:inline">Ausloggen</button>}
          </nav>
        </div>
      </header>
    );
}