import { useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useUserContext } from "../context/userContext"
import { useNavigate, Link } from "react-router-dom"
// import Hero from "../components/Hero"


export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUser } = useUserContext();
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await supabase.auth.signInWithPassword({email, password})
        if(result.error){
            alert(result.error.message)
        } else {
            setUser(result.data.user)
            navigate("/")
        }
    }

    return(
        <div className="font-sans">
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Anmeldung</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 ">
                        <h2 className="text-xl font-semibold mb-4">Ich habe bereits ein Konto</h2>
                        <p className="text-sm text-gray-600 mb-4">Felder mit einem * sind erforderlich.</p>
    
                        <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-Mail*:</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            placeholder="E-Mail eingeben"
                            required
                        />
                        </div>
                        <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Passwort*:</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Passwort eingeben" 
                            required
                        />
                        </div>
                        <div className="mb-6">
                            <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Passwort vergessen?</a>
                        </div>
                        <button className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Anmelden</button>
                        </div>
                    </form>
                    <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Ich bin neu hier</h2>
                    <p className="text-sm text-gray-600 mb-4"> Wenn du ein Konto anlegst, kannst du deine Lieblingsrezepte merken und irgendwann, wenn ICH es zulasse, wirst du auch Rezepte hinzufügen können!</p>
                    <Link to={"/registrierung"} className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Konto erstellen</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}