import React from "react";
import { Route, NavLink } from "react-router-dom";

import ItemDescription from "./ItemDescription";
import ItemShipping from "./ItemShipping";

function Item({ item, history, updateItem, deleteItem }) {
  // const item = props.items.find(thing => {
  //   console.log(thing.id, props.match.params.id);
  //   return `${thing.id}` === props.match.params.id;
  // });

  if (!item) {
    return <h2>Item data loading...</h2>;
  }

  return (
    <div className="item-wrapper">
      <div className="item-header">
        <div className="image-wrapper">
          <img src={item.imageUrl} alt={item.name} />
        </div>
        <div className="item-title-wrapper">
          <h2>{item.name}</h2>
          <h4>${item.price}</h4>
        </div>
      </div>
      <nav className="item-sub-nav">
        <NavLink exact to={`/item-list/${item.id}`}>
          Story
        </NavLink>
        <NavLink to={`/item-list/${item.id}/shipping`}>Shipping</NavLink>
      </nav>
      <div>
        <Route
          exact
          path="/item-list/:id"
          render={props => <ItemDescription {...props} item={item} />}
        />
        <Route
          path="/item-list/:id/shipping"
          render={props => <ItemShipping {...props} item={item} />}
        />
      </div>
      <div>
        <button
          onClick={event => {
            updateItem(event, item);
            history.push("/item-form");
          }}
          className="md-button"
        >
          Update Item
        </button>
        <button
          onClick={event => {
            deleteItem(event, item);
          }}
          className="md-button"
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default Item;
