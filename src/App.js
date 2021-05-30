import React from "react";
import Header from "./components/Header"
import Product from "./components/Product"
import data from "./data.json";

//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends React.Component{

  constructor(){
    super();
    this.state = {
        products: data.products,

    }
}
render(){
  return (
    <div className="main-container">
      <Header/>
       <main>
         <div className="content">
         <div className="main">
           <Product products={this.state.products}/>
           </div>
         
         </div>
         
       </main>
       <footer>
         Create by Juan Bojato
       </footer>
    </div>
  );
}
}

export default App;
