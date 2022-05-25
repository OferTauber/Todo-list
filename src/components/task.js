import React, { Component } from 'react';

class Task extends Component {
  state = { editMode: false, task: {}, tempTask: {} };

  componentDidMount() {
    this.setState({ task: this.props.task, tempTask: this.props.task });
  }

  componentDidUpdate() {
    if (this.props.openMode === 'edit' && !this.state.editMode)
      this.setState({ editMode: true });
  }

  onInputChange = (e) => {
    const prev = { ...this.state.tempTask };
    prev.task = e.target.value;
    this.setState({ tempTask: prev });
  };

  onCancel = () => {
    this.setState({ editMode: false, tempTask: this.state.task });
  };

  onSave = () => {
    console.log(this.state);
    if (this.state.task.task !== this.state.tempTask.task) {
      this.setState({ task: this.state.tempTask });
      this.props.onUpdate(this.state.tempTask);
    }
    this.setState({ editMode: false });
  };

  onDelete = (task) => {
    this.props.onDelete(task);
  };

  render() {
    const { task } = this.state.task;
    if (this.state.editMode) {
      return (
        <div className="item">
          <div className="middle aligned content">
            <input
              onChange={(e) => this.onInputChange(e)}
              type="text"
              value={this.state.tempTask.task}
              className="ui input"
            />
          </div>
          <div className="right floated content ">
            <button className="green ui button" onClick={this.onSave}>
              Save
            </button>
            <button className="red ui button " onClick={this.onCancel}>
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="item">
        <div className="middle aligned content">
          <div className="header">{task}</div>
        </div>
        <div className="right floated content">
          <button
            className="blue ui button"
            onClick={() => {
              this.setState({ editMode: true });
            }}
          >
            Edit
          </button>
          <button
            className="green ui button"
            onClick={() => {
              this.onDelete(this.state.task);
            }}
          >
            Done!
          </button>
        </div>
      </div>
    );
  }
}

export default Task;
