"use strict"

import React from "react";

import "./App.css";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.maxLength = 16;
    this.keyboard = [
      ["CA", "CE", "del", "÷"],
      ["7", "8", "9", "x"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "+"],
      ["±", "0", ".", "="]
    ];
    this.state = {
      display: "0",
      lastOperation: "",
      chain: []
    }
  }

  mainLogic = (pressed) => {

    let _state = Object.assign({}, this.state),
        checkLength = (display) => {
          return (display.length <= this.maxLength)
        };

    if (pressed === "CA") {
      _state = {
        display: "0",
        lastOperation: "",
        chain: []
      };
      this.setState(_state)
    }

    if (pressed == "CE") {
      if (_state.chain.length) {
        _state.chain = _state.chain.slice(0, -2);
      }
      else {
        _state.lastOperation = ""
      }
      this.setState(_state);
    }

    if (pressed == "=") {
      if (_state.lastOperation == "÷" && _state.display == 0) {
        return
      }
      _state.chain.push(_state.display);
      let hoarder = parseFloat(_state.chain[0]);
      for (let i = 1; i < _state.chain.length; i += 2) {
        switch (_state.chain[i]) {
          case "÷":
            hoarder = hoarder / parseFloat(_state.chain[i + 1]);
            break;
          case "x":
            hoarder = hoarder * parseFloat(_state.chain[i + 1]);
            break;
          case "-":
            hoarder = hoarder - parseFloat(_state.chain[i + 1]);
            break;
          case "+":
            hoarder = hoarder + parseFloat(_state.chain[i + 1]);
        }
      };
      _state.display = String(hoarder).slice(0, this.maxLength);
      _state.chain = [];
      _state.lastOperation = "=";
      this.setState(_state)
    }

    if ("÷x-+".indexOf(pressed) !== -1) {
      if (_state.lastOperation == "÷" && _state.display == 0) return
        _state.lastOperation = pressed;
        _state.chain.push(_state.display);
        _state.chain.push(pressed);
        _state.display = "0";
      this.setState(_state)
    }

    if (pressed == "del") {
      if (_state.display == "0") {
        return
      }
      let _displayMain = _state.display.split("");
      if (_displayMain.length == 2 && _displayMain[0] == "-") {
        _displayMain.shift();
        _displayMain[0] = "0";
      }
      else if (_displayMain.length > 1) {
        _displayMain.pop();
      } else {
        _displayMain[0] = 0;
      }
      _state.display = _displayMain.join("");
      this.setState(_state);
    }

    if (pressed == ".") {
      if (_state.display.indexOf(".") !== -1) {
        return;
      }
      _state.display += ".";
      if (checkLength(_state.display)) {
        this.setState(_state);
      }
    }

    if (pressed == "±") {
      if (_state.display == "0") {
        return
      }
      let _displayMain = _state.display.split("");
      if (_displayMain[0] == "-") {
        _displayMain.shift()
      } else {
        _displayMain.unshift("-");
      }
      _state.display = _displayMain.join("");
      this.setState(_state)
    }

    if ("1234567890".indexOf(pressed) !== -1) {
      if (_state.display == "0" && pressed == "0") {
        return;
      }
      if (_state.display == "0" || _state.lastOperation == "=") {
        _state.display = pressed;
        _state.lastOperation = "";
      } else {
        _state.display += pressed;
      }
      if (checkLength(_state.display)) {
        this.setState(_state);
      }
    }
  }

  renderKeyboard = (keyboard) => {
    let renderButton = (button) => {
          return (
              <button id="btn"
                      className="ui big button column"
                      onClick={() => this.mainLogic(button)}
                      key={button}>
                {button}
              </button>
          )
        },
        renderRow = (row) => {
          return (
              <div className="row" key={row.toString()}>
                {row.map(button => renderButton(button))}
              </div>
          )
        };
    return (
        <div className="ui equal width center aligned padded grid">
          {keyboard.map(row => renderRow(row))}
        </div>
    )
  }

  render() {
    return (
        <div id="main_container">
          <div className="ui equal width center aligned padded grid">
            <div className="row">
              <div className="column" id="display">
                <div id="display_main">
                  {this.state.display}
                </div>
                <div id="display_small">
                  {this.state.chain.join("").slice(-26)}
                </div>
              </div>
            </div>
            <div className="row" id="keyboard">
              {this.renderKeyboard(this.keyboard)}
            </div>
          </div>
        </div>
    )
  }
}