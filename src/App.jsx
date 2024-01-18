import { useEffect } from "react";
import useAxios from "./hooks/useAxios"


function App() {
  const { fetchData, response, loading } = useAxios();
  const { strDrink, strDrinkThumb, strGlass, strInstructions
  } = response;

  useEffect(() => {
    fetchData()
  }, []);

  if(loading) {
    return <h1>Loading...</h1>;
  }

  let ingredients = [];
  Object.keys(response).forEach((item, index) => {
    if(response[`strIngredient${index}`]) {
      ingredients.push({
        'ingredient': response[`strIngredient${index}`],
        'measure': response[`strMeasure${index}`]
      })
    }
  })

 

  return (
    <div className=" w-full h-full max-w-4xl mx-auto px-4 py-10">
      <div className=" flex flex-col justify-center items-center gap-2">
        <p>Click the button to check a random cocktail recipe for your after work</p>
        <button onClick={() => fetchData()} className=" bg-gray-800 text-white px-4 py-2 w-full rounded-md md:w-40">Get new Cocktail</button>
      </div>
      <div className=" bg-orange-50 p-6 mt-5">
        <h1 className="text-4xl font-bold mt-6 underline">{strDrink}</h1>
        <p>Glass Type: <span>{strGlass}</span></p>
        <div className=" md:grid md:grid-cols-2 md:gap-4">
          <div className=" mt-4 border-orange-500 border-4 rounded-md h-80">
            <img className=" w-full h-full object-cover" src={strDrinkThumb} alt={strDrink} />
          </div>
          <div className=" my-6">
            <h4 className=" text-4xl font-bold mb-2">Ingredients</h4>
        
            {ingredients.map((item, index) => 
              <div className=" flex text-sm">
              <li>{item.ingredient}<span className=" italic text-gray-300"> - {item.measure}</span></li>
            
            </div>
            )}
        
          </div>
          <div>
            <h4 className=" text-4xl font-bold mb-2">Instructions</h4>
            <p className=" leading-snug tracking-wide">{strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App