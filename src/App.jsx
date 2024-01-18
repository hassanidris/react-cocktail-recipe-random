import { useEffect } from "react";
import useAxios from "./hooks/useAxios"
import Skeleton from "./components/Skeleton";


function App() {
  const { fetchData, response, loading } = useAxios();
  const { strDrink, strDrinkThumb, strGlass, strInstructions
  } = response;

  useEffect(() => {
    fetchData()
  }, []);

  if(loading) {
    return (
        <div className=" w-full flex justify-center items-center">
          <div className="max-w-4xl mx-auto px-4 py-10">
          <div className=" flex flex-col justify-center items-center gap-3">
          <Skeleton className='h-16 md:w-80' />
          </div>
          <div className="bg-orange-50 rounded-md p-12 mt-8">
          <Skeleton className='h-20 md:w-60' />
            <div className=" md:grid md:grid-cols-2 md:gap-8">
              <div className=" mt-4 h-80">
              <Skeleton className=' h-80 md:w-80 mt-3' />
              </div>
              <div>
                <div className=" my-6">
                <Skeleton className='h-32 md:w-60' />
                </div>
                <div>
                <Skeleton className='h-32 md:w-80' />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      )
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
    <div className=" w-full h-screen  flex justify-center items-center">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className=" flex flex-col justify-center items-center gap-3">
          <p>Click the button to check a random cocktail recipe for your after work</p>
          <button onClick={() => fetchData()} className=" bg-gray-800 text-white px-4 py-2 w-full rounded-md md:w-60">Get for New Cocktail</button>
        </div>
        <div className=" bg-orange-50 p-12 mt-8 rounded-md">
          <h1 className="text-4xl font-bold underline">{strDrink}</h1>
          <p className=" text-gray-500 text-sm mt-2 italic"><b>Glass Type:</b> <span>{strGlass}</span></p>
          <div className=" md:grid md:grid-cols-2 md:gap-8">
            <div className=" mt-4 border-orange-500 border-4 rounded-md h-80">
              <img className=" w-full h-full object-cover" src={strDrinkThumb} alt={strDrink} />
            </div>
            <div>
              <div className=" my-6">
                <h4 className=" text-4xl font-bold mb-2">Ingredients</h4>
                {ingredients.map((item, index) =>
                  <div className=" flex text-sm">
                  <li>{item.ingredient}<span className=" italic text-gray-400"> - {item.measure}</span></li>
      
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
        <div className='text-center p-4 text-black text-xs'>&copy; Random Cocktail || made by <a className=' cursor-pointer underline hover:text-cyan-950' href="https://github.com/hassanidris" target='_blank'>Hassen Ahmed</a></div>
      </div>
    </div>
  )
}

export default App
