import backgroundImage from "../assets/background.jpeg"


export default function Hero(){
    return (
        <div>
          <div 
            className="bg-cover bg-center md:h-96 bg-opacity-75"
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(${backgroundImage})` 
            }}
          >
            <div className="container text-gray-100container mx-auto h-full px-4 md:px-0 flex flex-col justify-center items-center text-white"> 
              <h1 className="drop-shadow-2xl  text-2xl md:text-4xl text-center font-bold mb-4">
                Nie mehr Tolga nach Rezepten fragen, ist das nicht toll?
              </h1>
              <p className="drop-shadow-xl text-base md:text-lg text-center">
                Koche mit Leidenschaft und erlebe unvergessliche WG Momente einsam an deinem Herd, 
                denn du wohnst nicht mehr in einer WG. Du bist jetzt allein und erwachsen, machst deine 
                Steuern und strugglest im Job. Du wünschst dir deine Kindheit zurück, aber vergeblich. 
                Die Zeit schreitet voran und der Strudel der Ewigkeit hat dich im Bann. Deine Nichtigkeit 
                wird dir hin und wieder bewusst. Lust auf Reis?
              </p>
            </div>
          </div>
        </div>
      );
}