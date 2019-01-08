import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      min: 0,
      max: 100,
      enableTooltip: false,
      hoveredValue: 0
    }
    this.showValueTooltip = this.showValueTooltip.bind(this);
    this.onValuechange = this.onValuechange.bind(this);
  }

  onValuechange(event) {
    this.setState({value: event.target.value})
  }

  showValueTooltip(event) {
    const val = (((event.clientX - event.target.offsetLeft)/event.target.offsetWidth) * this.state.max).toFixed(0);
    this.setState({hoveredValue: val})
  }

  render() {
    return (
      <div className="App">
        <div id="slider-container">
        <div className="slider-track"></div>
        <div className="slider-track-active"></div>
        <div className="slider-handle"></div>
        <input
        id="slider"
        type="range" step="1"
        min={this.state.min} max={this.state.max}
        value={this.state.value}
        onChange={this.onValuechange}
        onMouseMove={this.showValueTooltip}
        onMouseEnter={() => this.setState({enableTooltip: true})}
        onMouseLeave={() => this.setState({enableTooltip: false, hoveredValue: 0})} />
        {this.state.enableTooltip && <span id="slider-tooltip">{this.state.hoveredValue}</span>}
        </div>
        {`Value is: ${this.state.value}`}
      </div>
    );
  }
}

export default App;
