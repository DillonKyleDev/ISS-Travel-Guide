import React, { Component } from 'react'

class ClassCounter extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({
      count: this.state.count + 1
    })
  }

  componentDidMount() {
    document.title = `Clicked ${this.state.count} times`
  }

  componentDidUpdate() {
    document.title = `Clicked ${this.state.count} times`
  }

  render() {
    return (
      <div>
        <button onClick={this.clickHandler}>Click me!</button>
      </div>
    )
  }
}

export default ClassCounter;