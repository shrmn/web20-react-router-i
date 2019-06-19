import React from "react";

class ItemForm extends React.Component {
  state = {
    item: this.props.activeItem || {
      name: "",
      price: "",
      imageUrl: "",
      description: "",
      shipping: ""
    }
  };

  changeHandler = e => {
    e.persist();
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        [e.target.name]: e.target.value
      }
    }));
  };

  handleSubmit = e => {
    this.props.addItem(e, this.state.item);
    this.setState({
      item: {
        name: "",
        price: "",
        imageUrl: "",
        description: "",
        shipping: ""
      }
    });
  };

  render() {
    return (
      <div>
        <h2>Add New Item</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={this.changeHandler}
            placeholder="name"
            value={this.state.item.name}
          />
          <input
            type="text"
            name="price"
            onChange={this.changeHandler}
            placeholder="price"
            value={this.state.item.price}
          />
          <input
            type="text"
            name="imageUrl"
            onChange={this.changeHandler}
            placeholder="imageUrl"
            value={this.state.item.imageUrl}
          />
          <input
            type="text"
            name="description"
            onChange={this.changeHandler}
            placeholder="description"
            value={this.state.item.description}
          />
          <input
            type="text"
            name="shipping"
            onChange={this.changeHandler}
            placeholder="shipping"
            value={this.state.item.shipping}
          />
          <button className="md-button form-button" onClick={this.handleSubmit}>
            Add New Item
          </button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
