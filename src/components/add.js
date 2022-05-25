import React, { Component } from 'react';

class Add extends Component {
  state = {
    deadline: Date.now(),
    priority: 0,
    task: '',
  };

  onInputChange = (event) => {
    const prev = { ...this.state };
    prev[event.target.dataset.type] = event.target.value;

    this.setState(prev);
  };

  addTask = () => {
    const newTask = {
      // deadline: Date.now(),
      priority: this.state.priority,
      task: this.state.task,
      createdAt: Date.now(),
      id: this.props.currentId,
    };
    this.props.addTask(newTask);
    this.setState({ priority: 0, task: '' });
  };

  render() {
    return (
      <div>
        <div className="ui inverted segment">
          <div className="ui inverted form">
            {/* <div className="three fields"> */}
            <div className="one fields">
              <div className="ten wide field">
                <label>Task todo:</label>
                <input
                  data-type="task"
                  value={this.state.task}
                  type="text"
                  onChange={this.onInputChange}
                />
              </div>
              {/* <div className="field">
                <label>Deadline</label>
                <input value={this.state.deadline} type="date" />
              </div> */}
              <div className="two wide field">
                <label>Priority</label>
                <input
                  value={this.state.priority}
                  type="number"
                  min="0"
                  max="5"
                  data-type="priority"
                  onChange={this.onInputChange}
                />
              </div>
            </div>

            <div className="ui blue submit button" onClick={this.addTask}>
              + Add Task
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add;
