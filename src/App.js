import { useState } from "react";
import { useEffect } from "react";
import { Nutrition } from "./Nutrition";
import { LoaderPage } from "./LoaderPage";
import "./App.css";

function App() {

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  const APP_ID = 'ddb3c7b1';
  const APP_KEY = 'b8c3a27f7fdb68805b543766caf44929';
  const APP_URL = 'https://api.edamam.com/api/nutrition-details'

  const fetchData = async (ingr) => {
    console.log(ingr);
    setStateLoader(true);

    const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setStateLoader(false);
      alert('⚠️Ingredients entered incorrectly!');
    }
  }

  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])


  return (
    <div className="container">
      {stateLoader && <LoaderPage />}

      <h1>What do you eat?</h1>
      <h2>Nutrition Analysis</h2>
      <form onSubmit={finalSearch}>
        <input
          placeholder="Search..."
          onChange={myRecipeSearch}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {
          myNutrition && <p> 🔥 {myNutrition.calories} kcal</p>
        }
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit }) =>
              <Nutrition
                key={label}
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
      </div>
    </div>
  );
}

export default App;
