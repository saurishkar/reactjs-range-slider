import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      min: 0,
      max: 100,
      enableTooltip: false,
      hoveredValue: 0,
      currHandlePos: 0
    }
    this.sliderHandleRef = React.createRef();
    this.showValueTooltip = this.showValueTooltip.bind(this);
    this.onValuechange = this.onValuechange.bind(this);
    this.setHandlePos = this.setHandlePos.bind(this);
  }

  onValuechange(event) {
    this.setState({value: event.target.value})
  }

  showValueTooltip(event) {
    const val = (((event.clientX - event.target.offsetLeft)/event.target.offsetWidth) * this.state.max).toFixed(0);
    console.log(val)
    this.setState({hoveredValue: val})
  }

  setHandlePos(event) {
    let newPos = event.clientX - event.target.offsetLeft;
    const sliderHandleEvent = this.sliderHandleRef.current;
    if(sliderHandleEvent && sliderHandleEvent.clientWidth) {
      newPos = newPos - (sliderHandleEvent.clientWidth / 2);
    }
    this.setState({currHandlePos: newPos})
  }

  render() {
    return (
      <div className="App">
        <div id="slider-container">
        <div id="slider-track" onMouseMove={this.showValueTooltip} onClick={this.setHandlePos}></div>
        <div id="slider-track-covered"></div>
        <div id="slider-handle"
        style={{left: this.state.currHandlePos}}
        ref={this.sliderHandleRef}
        ></div>
        <p>{this.state.hoveredValue}</p>
        </div>
      </div>
    );
  }
}

export default App;
