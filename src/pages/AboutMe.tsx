// import Hero from "../components/Hero";



export default function AboutMe(){
    return(
        <>
        {/* <Hero/> */}
        <article className="font-light text-base md:text-xl  mx-4 md:mx-auto max-w-4x1 my-16">
            <h1 className="text-2xl md:text-4x1 font-bold mb-4">Willkommen auf meiner persönlichen Rezeptsammlung!</h1>
            <br />
            <p>Diese Webseite entstand, weil meine Freunde mich ständig nach meinen Rezepten fragen. Anstatt jedes Mal die gleichen Rezepte rauszusuchen und zu verschicken, habe ich beschlossen, diese Seite als zentrale Anlaufstelle zu erstellen. Hier sammle ich alle meine Lieblingsrezepte – quasi als meine persönliche Rezeptedatenbank.</p>
            <br />
            <p>Die Seite ist ein Portfoliostück und wurde mit viel Liebe zum Detail entwickelt. Technisch gesehen basiert sie auf React und Typescript, während im Hintergrund eine Supabase-Datenbank mit PostgreSQL zum Einsatz kommt. Das Styling wurde mit Tailwind CSS realisiert.</p>
            <br />
            <p>Momentan bin ich der einzige, der sich einloggen und neue Rezepte hinzufügen kann. Aber wer weiß, vielleicht wird das ja irgendwann anders...</p>
            <br />
            <p>Das Design ist noch nicht in Stein gemeißelt und kann sich in Zukunft noch ändern. Auch der Name der Webseite ist noch nicht final.</p>
            <br />
            <p>Ich habe einfach Spaß daran, an dieser Seite zu coden und sie stetig zu erweitern. Schaut also gerne öfter mal vorbei und lasst euch von meinen Rezepten inspirieren!</p>
            <br />
            <p>Die Seite ist noch im Aufbau.</p>
        </article>
        </>
    )
}