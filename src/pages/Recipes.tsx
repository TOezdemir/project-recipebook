import { useState, useEffect, useRef, ElementRef } from "react";
import { getStorageURL, supabase } from "../lib/supabaseClient";
import type { QueryData } from "@supabase/supabase-js";
// import FeaturedRecipes from "../components/FeaturedRecipes";
import { Link } from "react-router-dom";
import slugify from "slugify";
// import Hero from "../components/Hero";

export default function Recipes(){

type GetAllRecipesData = QueryData<ReturnType<typeof getAllRecipes>>

const getAllRecipes = async () =>{
    const result = await supabase
    .from("recipes")
    .select("*")
    .order("created_at", {ascending: false})
    .like("name", `%${searchText}%`)
    console.log({data: result.data})
    console.log("Response:",{result})
    return result
  }

    const [recipes, setRecipes] = useState<GetAllRecipesData>([])
    const [searchText, setSearchText] = useState("")
    const inputRef = useRef<ElementRef<"input">>(null)

    useEffect(() => {
      getAllRecipes().then((result) => {
        setRecipes(result.data ?? []);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

    const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()
      const value = inputRef.current?.value || ""
      setSearchText(value)
      console.log(searchText)
    }

    const handleReset = () =>{
      inputRef.current!.value = ""
      setSearchText("")
    }
    
    return(
      <>
      {/* <Hero/> */}
        {/* <FeaturedRecipes/> */}
        <div className="container mx-auto">
        <form 
        onSubmit={handleSearch}
        className="relative flex items-center justify-center mb-8 gap-1 pt-10"
        >
            <input 
            ref={inputRef} 
            type="text"
            className="border border-gray-400 px-4 py-2 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 mr-2 w-full max-w-xs" />
          
            {searchText && (
            <button onClick={handleReset}
              type="reset"
              className="relative right-10 bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-2 rounded-s-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Suchfeld zurücksetzen"
              >X
            </button>)}
          
          <button
          className=" bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >Suche
          </button>
          
        </form>
        </div>
        <div className="container mx-auto pb-24">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Rezepte:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-neutral-100 rounded-lg shadow-md overflow-hidden relative min-h-[300px] md:min-h-[370px]"
            >
              {/* && fragt nur nach Wahrheit ab - benötigt keinen "else" */}
              {recipe.image_url && 
              <img
                src={getStorageURL(recipe.image_url) || "https://placehold.co/320x192"}
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />}
              
              <div className="px-6 pt-12 pb-16">
                <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                <p className="text-base text-black">{recipe.description_short}</p>
                <Link to={`/rezept/${slugify(recipe.name, {lower: true})}/${recipe.id}`} className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded mt-4 absolute bottom-4 left-4">
                  Zum Rezept
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
    );
}