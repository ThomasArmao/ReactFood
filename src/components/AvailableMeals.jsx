import { useEffect, useState } from "react";
import { fetchAvailableMeals } from "../http";
import Meals from "./Meals";

const AvailableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);

      try {
        const meals = await fetchAvailableMeals();
        setAvailableMeals(meals);
        setIsFetching(false);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch meals, please try again later!",
        });
        setIsFetching(false);
      }
    }
    fetchMeals();
  }, []);

  return (
    <Meals
      meals={availableMeals}
      isLoading={isFetching}
      fallbackText="No meals available."
      loadingText="Loading..."
    />
  );
};

export default AvailableMeals;
