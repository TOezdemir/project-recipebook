import { useEffect, useRef, useState } from "react";
import { produce } from "immer";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { supabase } from "../lib/supabaseClient";
import { QueryData } from "@supabase/supabase-js";
import { useUserContext } from "../context/userContext";

type Ingredient = {
  name: string;
  unit: string;
  quantity: number;
  additionalInfo: string;
};

const emptyIngredient: Ingredient = {
  name: "",
  unit: "",
  quantity: Number(""),
  additionalInfo: "",
};

export default function RecipeCreatePage() {
  const { user } = useUserContext()
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [recipePath, setRecipePath] = useState<string | undefined>("")
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [categories, setCategories] = useState<CategoryData>([])
  const [recipe, setRecipe] = useState({
    name: "",
    description_long: "",
    description_short: "",
    servings: 2,
    instructions: "",
    category_id: ""
  });

  type CategoryData = QueryData<ReturnType<typeof getAllCategories>>

  const getAllCategories = async () =>{
    const result = await supabase.from("categories").select("*")
    console.log(result.data)
    return result
  }

  useEffect(()=>{
    getAllCategories().then((result)=> setCategories(result.data || []))
  }, [])

  const navigate  = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imagePath: string | null = null

    if(!user) {return}
    const file = fileInputRef.current?.files?.[0] || null

    if(file){
      const uploadResult = await supabase.storage
        .from("recipe_image")
        .upload(`${user?.id}/${crypto.randomUUID()}`, file, {upsert: true})
      imagePath = uploadResult.data?.fullPath || null
    }

    const recipeResult = await supabase
      .from("recipes")
      .insert({
        ...recipe,
        image_url: imagePath
      })
      .select("id")
      .single();

    if (recipeResult.error) {
      alert("Fehler!")
      console.error(recipeResult.error);
      return;
    }

    const newRecipeId = recipeResult.data.id;

    const ingredientsResult = await supabase.from("ingredients").insert(
      ingredients.map((element) => ({
        name: element.name,
        additional_info: element.additionalInfo,
        unit: element.unit,
        quantity: element.quantity,
        recipe_id: newRecipeId
      }))
    );

    if (ingredientsResult.error) {
      alert("Sorry, keine Zutaten für dich!");
      return;
    }
    navigate(`/rezept/${slugify(recipe.name, {lower: true})}/${newRecipeId}`)
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, emptyIngredient]);
  };

  return(
    <form onSubmit={handleSubmit} className="font-sans p-6">
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Neues Rezept</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name des Gerichts:</label>
        <input
          type="text"
          value={recipe.name}
          required
          onChange={(e) =>
            setRecipe((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Name des Gerichts"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 

        />
      </div>
      <div className="mb-4">
        <label htmlFor="description_long" className="block text-gray-700 font-medium mb-2">Beschreibung:</label>
        <textarea
          value={recipe.description_long}
          required
          onChange={(e) =>
            setRecipe((prev) => ({ ...prev, description_long: e.target.value }))
          }
          placeholder="Beschreibung"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 

        />
      </div>
      <div className="mb-4">
        <label htmlFor="description_short" className="block text-gray-700 font-medium mb-2">Kurze Beschreibung:</label>
        <textarea
          maxLength={100}
          value={recipe.description_short}
          required
          onChange={(e) =>
            setRecipe((prev) => ({ ...prev, description_short: e.target.value }))
          }
          placeholder="Kurze Beschreibung"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 

        />
      </div>
      <div className="mb-4">
      <label htmlFor="instructions" className="block text-gray-700 font-medium mb-2">Zubereitung:</label>
        <textarea
          value={recipe.instructions}
          required
          onChange={(e) =>
            setRecipe((prev) => ({ ...prev, instructions: e.target.value }))
          }
          placeholder="Zubereitung"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="servings" className="block text-gray-700 font-medium mb-2">Portionen:</label>
        <input
          type="number"
          value={recipe.servings}
          required
          onChange={(e) =>
            setRecipe((prev) => ({ ...prev, servings: Number(e.target.value) }))
          }
          placeholder="Portionen"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Bild URL:</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          placeholder="Bild URL"
          ref={fileInputRef}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Kategorie:</label>
        <select
          value={recipe.category_id}
          required
          onChange={(e) =>
            setRecipe((prev) => ({ ...prev, category_id: e.target.value }))
          }
          name=""
          id=""
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option
            value="">Wähle aus</option>
            {categories.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h3>Zutaten</h3>
          <button type="button" onClick={addIngredient} className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Zutat hinzufügen
          </button>
      <div>
        {ingredients.map((ingredient, index) => {
          return (
            <div key={index} className="mt-2">
              <label htmlFor="ingredient" className="block text-gray-700 font-medium mb-2">Zutat:</label>
              <input
                type="text"
                value={ingredient.name}
                required
                onChange={(e) =>
                  setIngredients(
                    (oldIngredients) =>
                      produce(oldIngredients, (ingredientsDraft) => {
                        ingredientsDraft[index].name = e.target.value;
                      })
                  )
                }
                placeholder="Zutat"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              />
              <label htmlFor="unit" className="block text-gray-700 font-medium mb-2">Einheit:</label>
              <input
                type="text"
                value={ingredient.unit}
                required
                onChange={(e) =>
                  setIngredients(
                    (oldIngredients) =>
                      produce(oldIngredients, (ingredientsDraft) => {
                        ingredientsDraft[index].unit = e.target.value;
                      })
                  )
                }
                placeholder="Einheit"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              />
              <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">Menge:</label>
              <input
                type="number"
                value={ingredient.quantity}
                required
                onChange={(e) =>
                  setIngredients(
                    (oldIngredients) =>
                      produce(oldIngredients, (ingredientsDraft) => {
                        ingredientsDraft[index].quantity = Number(e.target.value);
                      })
                  )
                }
                placeholder="Menge"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              />
              <label htmlFor="additionalInfo" className="block text-gray-700 font-medium mb-2">Zusätzliche Information:</label>
              <input
                type="text"
                value={ingredient.additionalInfo}
                onChange={(e) =>
                  setIngredients(
                    (oldIngredients) =>
                      produce(oldIngredients, (ingredientsDraft) => {
                        ingredientsDraft[index].additionalInfo = e.target.value;
                      })
                  )
                }
                placeholder="Zusätzliche Information"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          );
        })}
      </div>
    </div>
    <button
      type="submit"
      className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
    >
      Einreichen
    </button>
    </div>
    </form>
  )
}