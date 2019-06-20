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
    if (this.props.activeItem) {
      this.props.updateItem(e, this.state.item);
    } else {
      this.props.addItem(e, this.state.item);
    }
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
        <h2>{`${this.props.activeItem ? "Update" : "Add New"} Item`}</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={this.changeHandler}
            placeholder="name"
            value={this.state.item.name}
          />
          <div className="baseline" />

          <input
            type="text"
            name="price"
            onChange={this.changeHandler}
            placeholder="price"
            value={this.state.item.price}
          />
          <div className="baseline" />

          <input
            type="text"
            name="imageUrl"
            onChange={this.changeHandler}
            placeholder="imageUrl"
            value={this.state.item.imageUrl}
          />
          <div className="baseline" />

          <input
            type="text"
            name="description"
            onChange={this.changeHandler}
            placeholder="description"
            value={this.state.item.description}
          />
          <div className="baseline" />

          <input
            type="text"
            name="shipping"
            onChange={this.changeHandler}
            placeholder="shipping"
            value={this.state.item.shipping}
          />
          <div className="baseline" />

          <button className="md-button form-button" onClick={this.handleSubmit}>
            {`${this.props.activeItem ? "Update" : "Add New"} Item`}
          </button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
