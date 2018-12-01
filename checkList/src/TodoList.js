import React, { Component, Fragment } from "react";
import Item from "./Item";
import axios from "axios";
import store from "./store";
import "./style.css";
export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      list: ["aaa"]
    };
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  render() {
    return (
      <Fragment>
        <h1>Your checking list</h1>
        <p />
        <input
          id="insertArea"
          className="input"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <span> </span>
        <button
          className="badge m-2 badge-primary"
          onClick={this.handleBtnClick}
        >
          Add to Checklist
        </button>
        <ul>{this.getTodoItem()}</ul>
      </Fragment>
    );
  }
  componentDidMount() {
    //Ajax request
    axios
      .get("/api/todolist.json")
      .then(res => {
        console.log(res.data);
        const newList = [...res.data];
        this.setState({
          list: newList
        });
      })
      .catch(() => {
        alert("error");
      });
  }
  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <Item
          key={index}
          content={item}
          index={index}
          deleteItem={this.handleDelete}
        />
      );
    });
  }
  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
    // console.log(e.target.value);
  }
  handleBtnClick() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ""
    });
  }
  handleDelete(index) {
    const newList = [...this.state.list];
    newList.splice(index, 1); //delete the one with required index
    this.setState({
      list: newList
    });
    console.log(index);
  }
}
