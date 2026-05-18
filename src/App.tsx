// import FeaturedRecipes from "./components/FeaturedRecipes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Recipes from "./pages/Recipes"
import Home from "./pages/Home"
import DetailPage from "./pages/DetailPage"
import Layout from "./components/Layout"
import AboutMe from "./pages/AboutMe"
import Login from "./pages/Login"
import RecipeCreatePage from "./pages/RecipeCreatePage"
import { UserContextProvider } from "./context/userContext"
import RegistrationPage from "./pages/RegistrationPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", 
        element: <Home /> 
      },
      {
        path: "/rezepte",
        element: <Recipes />,
      },
      {
        path: "/rezept/:name/:id",
        element: <DetailPage />,
      },
      {
        path: "/ueber-die-seite",
        element: <AboutMe />,
      },
      {
        path: "/neues-rezept-anlegen",
        element: <RecipeCreatePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registrierung",
        element: <RegistrationPage />,
      }
    ],
  },
]);

function App() {

  return (
    <div>
      <UserContextProvider>
      <RouterProvider router={router}/>
      </UserContextProvider>
    </div>
  )
}

export default App
