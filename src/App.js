import React from "react";
import Header from "./components/Header";
import Product from "./components/Product";
import Cart from "./components/ShoppingCart";
import Order from "./components/Order";
import store from "./store";
import {Provider} from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends React.Component{

createOrder = (order)=> {
  alert("Need to save order "+ order.name)
}
render(){
  return (
    <Provider store={store}>

 
    <Router>
    <Switch>
    <div className="main-container">
      <Header/>
       <main>
         <div className="content">
         <div className="main">
            <Route exact  path="/">
            <Product  />
            </Route>
          </div>
         
         </div>
            <Route exact path="/cart">
            <Cart  />
            </Route>

            <Route path="/order" component={Order} />
        
       </main>
       <footer>
         Create by Juan Bojato
       </footer>
    </div>
    </Switch>
    </Router>
    </Provider>
  );
}
}

export default App;
