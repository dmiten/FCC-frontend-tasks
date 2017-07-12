"use strict"

import React from "react";

import { Button, Header, Progress } from 'semantic-ui-react'

import "./App.css";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.counter = {};
    this.state = {
      currentLength: 60000,
      currentStart: {},
      currentValue: 0,
      progressColor: "yellow",
      segment0Length: 1500000,
      segment1Length: 300000
    }
  }

  setCounter = () => {
    let _state = {};
    clearInterval(this.counter);
    this.counter = setInterval(() => {
      _state.currentValue = this.state.currentValue + 1000;
      if (_state.currentValue > this.state.currentLength) {
        if (this.state.progressColor == "yellow") {
          _state.progressColor = "green";
          _state.currentLength = this.state.segment1Length
        } else {
          _state.progressColor = "yellow";
          _state.currentLength = this.state.segment0Length
        }
        _state.currentValue = 0;
        _state.currentStart = Date.now()
      }
      this.setState(_state)
    }, 1000)
  }

  handleButtons = (name, operation) => {
    let _state = Object.assign({}, this.state);
    if (operation) {
      _state["segment" + name + "Length"] += operation * 60000;
      if (_state["segment" + name + "Length"] < 60000) {
        _state["segment" + name + "Length"] = 60000
      }
      this.setState(_state);
    } else {
      _state.currentStart = Date.now();
      _state.currentValue = 0;
      _state.currentLength = _state["segment" + name + "Length"];
      if (parseInt(name)) {
        _state.progressColor = "green"
      } else {
        _state.progressColor = "yellow"
      }
      this.setState(_state);
      this.setCounter()
    }
  }

  renderHeader = () => {
    if (this.state.currentValue) {
      if (this.state.progressColor == "yellow") {
        return (
            <Header as="h1"
                    color={this.state.progressColor}
                    id="header">
              session
            </Header>
        )
      } else {
        return (
            <Header as="h1"
                    color={this.state.progressColor}
                    id="header">
              time for break
            </Header>
        )
      }
    } else {
      return (
          <Header as="h1"
                  id="header">
            Pomodoro Clock
          </Header>
      )
    }
  }

  render() {
    return (
        <div id="main_container">
          {this.renderHeader()}
          <Progress active
                    id="progress_bar"
                    color={this.state.progressColor}
                    precision={0}
                    progress="percent"
                    size="big"
                    total={this.state.currentLength}
                    value={this.state.currentValue}>
            <div id="current_value">
              {Math.trunc(this.state.currentValue / 60000) + " min"}
            </div>
          </Progress>
          <div id="buttons">
              <Button.Group size="tiny">
                <Button onClick={() => this.handleButtons("0", -1)}>
                  -
                </Button>
                <Button color="yellow"
                        onClick={() => this.handleButtons("0", 0)}>
                  {this.state.segment0Length / 60000 + " min"}
                  </Button>
                <Button onClick={() => this.handleButtons("0", 1)}>
                  +
                </Button>
              </Button.Group>
              <Button.Group size="tiny">
                <Button onClick={() => this.handleButtons("1", -1)}>
                  -
                </Button>
                <Button color="green"
                        onClick={() => this.handleButtons("1", 0)}>
                  {this.state.segment1Length / 60000 + " min"}
                </Button>
                <Button onClick={() => this.handleButtons("1", 1)}>
                  +
                </Button>
              </Button.Group>
          </div>
        </div>
    )
  }
}