import React from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import ItemList from "./components/ItemList";
import Item from "./components/Item";

import items from "./data";

import "./App.css";

class App extends React.Component {
  state = {
    items: items,
    doggos: []
  };

  componentDidMount() {
    fetch("https://dog.ceo/api/breed/husky/images")
      .then(res => res.json())
      .then(dogs => {
        console.log("dogs: ", dogs);
        this.setState({ doggos: dogs.message });
      })
      .catch(err => console.log("noooo"));
    // axios
    //   .get("https://dog.ceo/api/breed/husky/images")
    //   .then(res => {
    //     console.log(res);
    //     this.setState({ doggos: res.data.message });
    //   })
    //   .catch(err => console.log("error: ", err));
  }

  render() {
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
        <Route
          exact
          path="/"
          render={props => <Home {...props} doggos={this.state.doggos} />}
        />
        <Route
          exact
          path="/item-list"
          render={props => (
            <ItemList
              {...props}
              // match={props.match}
              // history={props.history}
              // location={props.location}
              items={this.state.items}
            />
          )}
        />
        <Route
          path="/item-list/:id"
          render={props => <Item {...props} items={this.state.items} />}
        />
      </div>
    );
  }
}

export default App;
