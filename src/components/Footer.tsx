import { NavLink } from "react-router-dom"
import { SocialIcon } from "react-social-icons";

export default function Footer() {
  return (
    <footer className="bg-yellow-400 h-48 py-8 flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between mb-4"> {/* px-4 und flex-col hinzugefügt */}
        <NavLink to="/" className="flex items-center mb-4 md:mb-0">
          <span className="font-normal text-4xl">WG: Rezepte</span>
        </NavLink>
  
        <div className="flex flex-col items-center md:items-start">
          <span className="font-normal text-xl text-gray-800 mb-4">Social Media</span>
          <nav className="flex space-x-6">
            <a href="https://www.instagram.com/" target="_blank">
              <SocialIcon url="https://www.instagram.com/" aria-label="Instagram" className="h-6" />
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <SocialIcon url="https://www.youtube.com/" aria-label="YouTube" className="h-6" />
            </a>
            <a href="https://www.threads.net/?hl=de" target="_blank">
              <SocialIcon url="https://www.threads.net/?hl=de" aria-label="Meta Threads" className="h-6" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}