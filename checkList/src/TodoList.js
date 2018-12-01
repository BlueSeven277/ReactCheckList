import React, { Component, Fragment } from "react";
import Item from "./Item";
import axios from "axios";
import store from "./store";
import "antd/dist/antd.css";
import "./style.css";
import { Input, Button, List } from "antd";
export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      list: []
    };
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  render() {
    return (
      <Fragment>
        <h1 style={{ marginLeft: "100px", marginTop: "50px" }}>
          Checklist: click button to add, click item to delete
        </h1>
        <p />
        <Input
          id="insertArea"
          placeholder="add something..."
          style={{ width: "600px", marginLeft: "50px" }}
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <span> </span>
        <Button
          type="primary"
          // className="badge m-2 badge-primary"
          onClick={this.handleBtnClick}
        >
          Add to Checklist
        </Button>
        {/* <ul style={{ marginLeft: "60px", marginTop: "20px" }}>
          {this.getTodoItem()}
        </ul> */}
        <List
          style={{ marginLeft: "60px", marginTop: "20px", width: "800px" }}
          bordered
          dataSource={this.getTodoItem()}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </Fragment>
    );
  }
  componentDidMount() {
    //Ajax request, add  backend api data to front end
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
