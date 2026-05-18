import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstname, last_name: lastname },
      },
    });
    if (result.error) {
      alert(result.error.message);
    } else {
      setUser(result.data.user);
      navigate("/")
    }
  };

  return (
    <div className="font-sans">
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6 text-center">Ein Konto erstellen</h1>
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Ich bin neu hier</h2>
      <p className="text-sm text-gray-600 mb-4">Felder mit einem * sind erforderlich</p>
      <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label 
          htmlFor="firstName" 
          className="block text-gray-700 font-medium mb-2">Vorname*:</label>
          <input 
          type="text" 
          id="firstName"
          placeholder="Vornamen eingeben"
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="shadow appearance-none border rounded w-64  md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label 
          htmlFor="lastName" 
          className="block text-gray-700 font-medium mb-2">Nachname*:</label>
          <input 
          type="text" 
          id="lastName"
          placeholder="Nachnamen eingeben" 
          required
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="shadow appearance-none border rounded w-64  md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>
      <div className="mb-4">
        <label 
        htmlFor="email" 
        className="block text-gray-700 font-medium mb-2">E-Mail*:</label>
        <input 
        type="email" 
        id="email"
        placeholder="Email eingeben"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="shadow appearance-none border rounded w-64  md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label 
        htmlFor="password" 
        className="block text-gray-700 font-medium mb-2">Passwort*:</label>
        <input 
        type="password" 
        id="password" 
        placeholder="Passwort eingeben"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="shadow appearance-none border rounded w-64  md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <button className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ein Konto erstellen</button>
      </form>
    </div>
  </div>
</div>
  )
}