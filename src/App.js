import Header from "./components/Header"
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="container">
      <Header/>
       <main>
         <p> Product list </p>
       </main>
       <footer>
         Create by Juan Bojato
       </footer>
    </div>
  );
}

export default App;
