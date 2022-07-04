import { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {

  const [showCart, setShowCart] = useState(false)

  const showCartHandler = () => {
    setShowCart(true);

  }
  const hideCartHandler = () => {
   setShowCart(false);
  }

  return (
    <Fragment>
      {showCart && <Cart onClose={hideCartHandler}/>}
       <Header onShowCart={showCartHandler}></Header>
       <main>
         <Meals></Meals>
       </main>
    </Fragment>
  );
}

export default App;
