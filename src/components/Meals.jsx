import { useContext } from "react";
import {CartContext} from "../store/cart-context";

const Meals = ({ meals, isLoading, fallbackText, loadingText }) => {
  const { addItemToCart } = useContext(CartContext);

  return (
    <section>
      {isLoading && <p>{loadingText}</p>}
      {!isLoading && meals.length === 0 && <p>{fallbackText}</p>}

      {!isLoading && meals.length > 0 && (
        <div id="meals">
          {meals.map((meal) => (
            <article key={meal.id} className="meal-item">
              <img src={`http://localhost:3000/${meal.image}`} alt="" />
              <h3>{meal.name}</h3>
              <p className="meal-item-price">$ {meal.price}</p>
              <p className="meal-item-description">{meal.description}</p>
              <button className="meal-item-actions" onClick={()=>addItemToCart(meal)}>Add to Cart</button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Meals;
