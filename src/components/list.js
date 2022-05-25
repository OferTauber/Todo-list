import React, { Component } from 'react';
import Task from './task';
import axios from 'axios';
import Add from './add';

const URL = 'https://628e194da339dfef87a787c6.mockapi.io/ofer_todo/todo_list';

class List extends Component {
  state = {
    tasksList: [],
    currentId: undefined,
    showSpinner: true,
  };

  async componentDidMount() {
    try {
      const listAPI = await axios.get(URL);
      this.setState({
        tasksList: listAPI.data,
        currentId: listAPI.data.length + 1,
        showSpinner: false,
      });
    } catch (err) {
      console.error(err);
    }
  }

  onTaskUpdate = async (task) => {
    this.setState({ showSpinner: true });

    try {
      await axios.put(`${URL}/${task.id}`, task);
      const listAPI = await axios.get(URL);
      this.setState({
        tasksList: listAPI.data,
        currentId: listAPI.data.length + 1,
        showSpinner: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  onTaskDeleted = async (task) => {
    this.setState({ showSpinner: true });

    try {
      await axios.delete(`${URL}/${task.id}`);
      const listAPI = await axios.get(URL);
      this.setState({
        tasksList: listAPI.data,
        currentId: listAPI.data.length + 1,
        showSpinner: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  addTask = async (task) => {
    this.setState({ showSpinner: true });
    try {
      await axios.post(URL, task);
      const listAPI = await axios.get(URL);
      this.setState({
        tasksList: listAPI.data,
        currentId: listAPI.data.length + 1,
        showSpinner: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  ganerateList() {
    return this.state.tasksList.map((task) => {
      return (
        <Task
          task={task}
          key={task.id}
          onUpdate={this.onTaskUpdate}
          onDelete={this.onTaskDeleted}
          openMode={task === '' ? 'edit' : 'no'}
        />
      );
    });
  }

  render() {
    return (
      <>
        <div className="ui middle aligned divided list  container">
          <Add addTask={this.addTask} currentId={this.state.currentId} />
          <br />
          <br />
          {this.state.showSpinner ? <Spinner /> : this.ganerateList()}
        </div>
      </>
    );
  }
}

export default List;

const Spinner = () => {
  return (
    <div className="ui active inverted dimmer">
      <div className="ui text loader">Loading</div>
    </div>
  );
};
