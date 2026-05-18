// import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { useEffect, useState } from "react"
import type { QueryData } from "@supabase/supabase-js"


export default function DetailPage(){
    //         getter       setter
    const [ singleRecipe, setSingleRecipe] = useState<GetSingleRecipeData | null >(null)
    const { id } = useParams<{id: string}>()

    type GetSingleRecipeData = QueryData<ReturnType<typeof getSingleRecipe>>

    // Hier hole ich mir das einzelne Rezept über die ID heraus:
    const getSingleRecipe = async (id: string) =>{
        const result = await supabase
        .from("recipes")
        // "ingredients" ist die neue Tabelle, die hier dazu aufgerufen wird!
        .select(`
            *,
            ingredients(
            name,
            id,
            quantity,
            unit,
            additional_info
            )
            `)
        .eq("id", id)
        .single()
        return result
    }

    useEffect(()=> {
        if(id){
            getSingleRecipe(id).then((result) =>{
            setSingleRecipe(result.data ?? null)
        })}
    }, [id])
    console.log(singleRecipe)

    return(
        <div className="p-6 ">
            <div className="max-w-4xl mx-5 p-8">
            {/* Wie Bild hier einfügen?! */}
            <h1 className="mb-4 text-4xl font-bold text-center">{singleRecipe?.name}</h1>
            <section className="space-y-4">
                <p className="text-gray-700">{singleRecipe?.description_long}</p>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Zutaten</h2>
                    <ul className="list-disc list-inside">
                        {singleRecipe?.ingredients.map((e)=>(
                            <li key={e.id} className="mb-2">
                                <span className="font-medium">{e.name}, {e.quantity} {e.unit}</span>
                                {e.additional_info && (
                                    <span className="text-gray-600 ml-2">{e.additional_info}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Zubereitung</h2>
                    <p className="whitespace-pre-line">
                        {singleRecipe?.instructions}
                    </p> 
                </div>
            </section>
            </div>
        </div>
    )
}