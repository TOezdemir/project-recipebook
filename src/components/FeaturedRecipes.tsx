import { useState, useEffect } from "react";
import { getStorageURL, supabase } from "../lib/supabaseClient";
import type { QueryData } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import slugify from "slugify";

const getFeaturedRecipes = async () => {
  const result = await supabase
  // Hier einen Randomizer einsetzen!
    .from("recipes")
    .select("id, description_short, name, image_url")
    .limit(3)
    // .order('RAMDOM()')
  return result
}

// * Das hier und die folgenden benötigen einen anderen Typen im Promise? Meh...
// const getFeaturedRecipes = async (): Promise<{data: Recipe[]; error: any}> =>{
//   const {data, error} = await supabase
//   .rpc("get_random_recipes", {limit_param: 3})
//   if(error){
//     console.error("Error fecthing featured recipes:", error)
//     return null
//   }
//   return data
// }

// const get getFeaturedRecipe = async () =>{
  // const { data, error } = await supabase
  //     .from('recipes')
  //     .select('id, description_short, name, image_url')
  //     .order('id', { ascending: false}) 
  //     .limit(3)
  //     .order('RANDOM()'); 
  //   if (error) {
  //     console.error('Error fetching featured recipes:', error);
  //   return null; 
  // }
  // return data;
// }

// const getFeaturedRecipes = async () =>{
//   const result = await supabase
//   .from("recipes")
//   .select("id, description_short, name, image_url")
  
//   const shuffledRecipes = result.data!.sort(()=> 0.5 - Math.random())
//   return shuffledRecipes.slice(0,3)
// }

type GetFeaturedRecipesData = QueryData<ReturnType<typeof getFeaturedRecipes>>

export default function FeaturedRecipes() {
  const [recipes, setRecipes] = useState<GetFeaturedRecipesData>([])

  useEffect(() => {
    getFeaturedRecipes().then((result) => {
      setRecipes(result?.data ?? []);
    });
  }, []);
  

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Ausgewählte Rezepte:
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
              src={getStorageURL(recipe.image_url) || "https://placehold.co/320x192" }
              alt={recipe.name}
              className="w-full h-48 object-cover"
            />}
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
              <p className="text-base text-black">{recipe.description_short}</p>
              <Link 
              to={`/rezept/${slugify(recipe.name, {lower: true})}/${recipe.id}`} 
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded mt-4 absolute bottom-4 left-4"
              >
                Zum Rezept
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}