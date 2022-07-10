import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";
import MenuItem from "./MenuItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://reactbackend-2d008-default-rtdb.asia-southeast1.firebasedatabase.app/react-http/meals.json"
      );
      

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        let addItem = {
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        };
        loadedMeals.push(addItem);
        setMeals(loadedMeals);
        setIsLoading(false);
      }
    };
    fetchMeals().catch((error) => {
      
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading..</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MenuItem item={meal} key={meal.id}></MenuItem>
  ));

  return (
    <Card className={classes.meals}>
      <ul>{mealsList}</ul>
    </Card>
  );
};

export default AvailableMeals;



