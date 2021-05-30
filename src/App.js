import React from "react";
import Header from "./components/Header"
import Product from "./components/Product"
import Cart from "./components/ShoppingCart"
import data from "./data.json";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends React.Component{

  constructor(){
    super();
    this.state = {
        products: data.products,
        carts: []

    }
}

addToCart = (product) =>{
const carts = this.state.carts.slice();
let existCart = false;
carts.forEach(item => {
  if(item._id === product._id){
    item.count++;
    existCart = true;
  }
});
if(!existCart){
  carts.push({...product,count : 1})
}
this.setState({carts})
}

removeFromCart = (product)=> {
  const carts = this.state.carts.slice();
  this.setState({carts: carts.filter(item=> item._id !== product._id)})
}
render(){
  return (
    <Router>
    <div className="main-container">
      <Header/>
       <main>
         <div className="content">
         <div className="main">
           <Product products={this.state.products} 
           addToCart={this.addToCart}
           />
           </div>
         
         </div>
         <Cart  carts={this.state.carts}
         removeFromCart={this.removeFromCart}  />
       </main>
       <footer>
         Create by Juan Bojato
       </footer>
    </div>
    </Router>
  );
}
}

export default App;
