import AvailableMeals from "./components/AvailableMeals";
import Header from "./components/Header";
import CartContextProvider from "./store/cart-context";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <AvailableMeals />
    </CartContextProvider>
  );
}

export default App;
