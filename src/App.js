import React from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import ItemList from "./components/ItemList";
import Item from "./components/Item";
import ItemForm from "./components/ItemForm";

// import items from "./data";

import "./App.css";

class App extends React.Component {
  state = {
    items: [],
    doggos: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:3333/items")
      .then(res => {
        console.log(res);
        return this.setState({ items: res.data });
      })
      .catch(error => console.log("Fetch Error: ", error));
  }

  addItem = (e, item) => {
    e.preventDefault();
    axios
      .post("http://localhost:3333/items", item)
      .then(res => {
        this.setState({
          items: res.data
        });
        this.props.history.push("/item-list");
      })
      .catch(err => {
        console.log("POST err: ", err);
      });
  };

  render() {
    return (
      <div className="App">
        <nav>
          <h1 className="store-header">Adam's Trinkets</h1>
          <div className="nav-links">
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink to="/item-list">Shop</NavLink>
            <NavLink to="/item-form">Add Item</NavLink>
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
        <Route
          path="/item-form"
          render={props => <ItemForm {...props} addItem={this.addItem} />}
        />
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
