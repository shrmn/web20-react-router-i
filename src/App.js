import React from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import ItemList from "./components/ItemList";
import Item from "./components/Item";
import ItemForm from "./components/ItemForm";

// import items from "./data";

import "./App.css";

const blankItem = {
  name: "",
  description: "",
  imageUrl: "",
  shipping: "",
  price: ""
};

class App extends React.Component {
  state = {
    items: [],
    activeItem: null,
    editingId: null
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

  getItemById = id => {
    axios
      .get(`http://localhost:3333/itemById/${id}`)
      .then(res => this.setState({ activeItem: res.data }))
      .catch(err => console.log(err));
  };

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

  updateItem = (e, item) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3333/items/${this.state.editingId}`, item)
      .then(response =>
        this.setState({
          items: response.data,
          editingId: null,
          isEditing: false,
          item: blankItem
        }).then(this.props.history.push(`/item-list/${item.id}`))
      );
  };

  deleteItem = (e, item) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3333/items/${item.id}`)
      .then(res => this.setState({ items: res.data }))
      .then(this.props.history.push("/item-list"));
  };

  setUpUpdateForm = (e, item) => {
    e.preventDefault();
    this.setState({
      isediting: true,
      editingId: item.id,
      item
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
            <NavLink to="/item-form">{`${
              this.props.activeItem ? "Update" : "Add New"
            } Item`}</NavLink>
          </div>
        </nav>
        <Route exact path="/" render={props => <Home {...props} />} />
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
              getItemById={this.getItemById}
            />
          )}
        />
        <Route
          path="/item-list/:id"
          render={props => (
            <Item
              {...props}
              deleteItem={this.deleteItem}
              updateItem={this.setUpUpdateForm}
              item={this.state.activeItem}
            />
          )}
        />
        <Route
          path="/item-form"
          render={props => (
            <ItemForm
              {...props}
              updateItem={this.updateItem}
              addItem={this.addItem}
              activeItem={this.state.activeItem}
            />
          )}
        />
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
