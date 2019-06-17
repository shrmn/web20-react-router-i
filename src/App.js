import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./components/Home";
import ItemList from "./components/ItemList";
import Item from "./components/Item";

import "./App.css";

function App() {
  return (
    <div className="App">
      <nav>
        <h1 className="store-header">Adam's Trinkets</h1>
        <div className="nav-links">
          <Link exact to="/">
            Home
          </Link>
          <Link to="/item-list">Shop</Link>
        </div>
      </nav>
      <Route exact path="/" component={Home} />
      <Route exact path="/item-list" component={ItemList} />
      <Route path="/item-list/:id" component={Item} />
    </div>
  );
}

export default App;
