import React from "react";

function ItemList(props) {
  function routeToItem(e, item) {
    e.preventDefault();
    props.history.push(`item-list/${item.id}`);
    props.getItemById(item.id);
  }
  return (
    <div className="items-list-wrapper">
      {props.items.map(item => (
        <div
          onClick={e => routeToItem(e, item)}
          className="item-card"
          key={item.id}
        >
          <img
            className="item-list-image"
            src={item.imageUrl}
            alt={item.name}
          />
          <p>{item.name}</p>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
