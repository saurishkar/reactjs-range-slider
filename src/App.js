import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      min: 0,
      max: 100,
      enableTooltip: false,
      hoveredValue: 0,
      currHandlePos: 0,
      coveredTrackWidth: 0
    };
    // Refs
    this.sliderHandleRef = React.createRef();
    this.coveredTrackRef = React.createRef();

    // Events
    this.showValueTooltip = this.showValueTooltip.bind(this);
    this.onValuechange = this.onValuechange.bind(this);
    this.setHandlePos = this.setHandlePos.bind(this);
    this.onTrackClick = this.onTrackClick.bind(this);
    this.onHandleDrag = this.onHandleDrag.bind(this);
    this.setCoveredTrackWidth = this.setCoveredTrackWidth.bind(this);

    // Helpers
    this.findHandleWidth = this.findHandleWidth.bind(this);
    this.findHandlePos = this.findHandlePos.bind(this);
  }

  onValuechange(event) {
    this.setState({value: event.target.value});
  }

  showValueTooltip(event) {
    const val = (((event.clientX - event.target.offsetLeft)/event.target.offsetWidth) * this.state.max).toFixed(0);
    console.log(val);
    this.setState({hoveredValue: val});
  }

  setHandlePos(newPos) {
    this.setState({currHandlePos: newPos});
  }

  setCoveredTrackWidth(handlePos) {
    const coveredTrackEvent = this.coveredTrackRef.current;
    this.setState({coveredTrackWidth: Math.abs(handlePos - coveredTrackEvent.offsetLeft)});
  }

  onTrackClick(event) {
    let newPos = event.clientX - event.target.offsetLeft;
    newPos = newPos - (this.findHandleWidth() / 2);
    this.setHandlePos(newPos);
    this.setCoveredTrackWidth(newPos);
  }

  onHandleDrag(event) {
    let newPos = this.findHandlePos();
    console.log(newPos);
  }

  findHandleWidth() {
    const sliderHandleEvent = this.sliderHandleRef;
    return sliderHandleEvent && sliderHandleEvent.current ? sliderHandleEvent.current.clientWidth || 0 : 0;
  }

  findHandlePos() {
    const sliderHandleEvent = this.sliderHandleRef;
    return sliderHandleEvent && sliderHandleEvent.current ?
      (sliderHandleEvent.clientX - sliderHandleEvent.offsetLeft) || 0
      : 0;
  }

  render() {
    return (
      <div className="App">
        <div id="slider-container">
          <div id="slider-track-ghost"></div>
          <div id="slider-track" onMouseMove={this.showValueTooltip} onClick={this.onTrackClick}></div>
          <div id="slider-track-covered" style={{width: this.state.coveredTrackWidth}} ref={this.coveredTrackRef}></div>
          <div id="slider-handle"
            draggable="true"
            style={{left: this.state.currHandlePos}}
            ref={this.sliderHandleRef}
            onDrag={this.onHandleDrag}
          ></div>
          <p>{this.state.hoveredValue}</p>
        </div>
      </div>
    );
  }
}

export default App;
