import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';



const AvailableMeals = () => {
  const [meals,setMeals] = useState([]);
  const {isLoading,httpError,sendRequest} = useHttp();

  useEffect(() => {
    const tranformMeals = (resposeData) => {
      const loadedMeals = [];
      for(const key in resposeData) {
        loadedMeals.push({
          id:key,
          name: resposeData[key].name,
          description: resposeData[key].description,
          price: resposeData[key].price,
        })
      }
      setMeals(loadedMeals);
    }

    sendRequest({
      url: `https://udemy-couse.firebaseio.com/meals.json` 
    },tranformMeals)
  },[sendRequest])
 

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
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
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  

  return (
    <section className={classes.meals}>
      <Card>
        {mealsList}
      </Card>
    </section>
  );
};

export default AvailableMeals;
