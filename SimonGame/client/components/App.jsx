"use strict"

import React from "react";

import "./App.css";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.const = this.initialConst();
    this.state = this.initialState()
  }

  initialConst = () => ({
    quant: 50,
    audioContext: new (window.AudioContext || window.webkitAudioContext)(),
    pressedStyle: {
      borderColor: "transparent",
      boxShadow: "1px 1px 4px White, -1px 1px 4px White, " +
                 "1px -1px 4px White, -1px -1px 4px White",
      WebkitBoxShadow: "1px 1px 4px White, -1px 1px 4px White, " +
                       "1px -1px 4px White, -1px -1px 4px White"
    }
  })

  initialState = () => {
    this.current = -1;
    this.error = false;
    this.humanMove = false;
    this.rounds = [];
    return {
      colorButtons: [{
        color: "green",
        freq: 350
      }, {
        color: "red",
        freq: 300
      }, {
        color: "blue",
        freq: 250
      }, {
        color: "orange",
        freq: 200
      }]
    }
  }

  mainLogic = (index) => {

    let reset = () => {
          let highestTimeoutId = setTimeout(";");
          for (let i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i)
          };
          this.setState(this.initialState())
        },

        playAndDisplayNote = (index) => {
          let _state = Object.assign({}, this.state),
              sound = new Sound(this.const.audioContext),
              now = this.const.audioContext.currentTime;
          _state.colorButtons[index].style = this.const.pressedStyle;
          this.setState({_state});
          sound.play(this.state.colorButtons[index].freq, now);
          setTimeout(() => {
            _state.colorButtons[index].style = {};
            this.setState({_state})
          }, this.const.quant * 4)
        },

        playAll = () => {
          for (let i = 0; i < this.rounds.length; i++) {
            setTimeout(() => playAndDisplayNote(this.rounds[i]),
                this.const.quant * 10 * i)
          };
          setTimeout(() => this.humanMove = true,
              this.const.quant * 10 * this.rounds.length)
        },

        flashAll = () => {
          let _state = Object.assign({}, this.state),
              setStyle = (style) => {
                for (let i = 0; i < 4; i++) {
                  _state.colorButtons[i].style = style
                };
                this.setState(_state);
              };
          setStyle(this.const.pressedStyle);
          setTimeout(() => setStyle({}), this.const.quant * 5)
        },

        addRandom = () => {
          this.rounds.push(Math.floor(Math.random() * 4))
        };

    if (index == -1) {
      reset();
      addRandom();
      this.current = 0;
      playAll();
      return
    }

    this.humanMove = false;
    playAndDisplayNote(index);

    if (index == this.rounds[this.current]) {
      this.current ++;
      if (this.current == 20) {
        flashAll();
        return
      };
      if (this.current == this.rounds.length) {
        this.current = 0;
        addRandom();
        setTimeout(() => playAll(), this.const.quant * 15)
        return
      };
      setTimeout(() => this.humanMove = true, this.const.quant * 5)
    } else {
      this.error = true;
      if (this.state.strict) {
        return
      } else {
        setTimeout(() => {
          this.error = false;
          this.current = 0;
          playAll()
        }, this.const.quant * 40)
      }
    }
  }

  handleColorButtonClick = (index) => {
    if (this.humanMove) {
      this.mainLogic(index)
    }
  }

  handleStrictClick = () => {
    this.setState({strict: !this.state.strict})
  }

  renderColorButtons = () => {
    let renderOne = (index) =>
        <div className="color_button"
             id={this.state.colorButtons[index].color}
             key={this.state.colorButtons[index].color}
             onClick={() => this.handleColorButtonClick(index)}
             style={this.state.colorButtons[index].style}>
        </div>
    return (
        <div>
          {this.state.colorButtons.map((item, index)=> renderOne(index))}
        </div>
    )
  }

  renderDisplay = () => {

    let strictColor = this.state.strict ? "#c00000" : "#230000",
        roundColor = this.rounds.length > 0 ? "#c00000" : "#230000",
        display;

    if (this.error) {
      display = "!!"
    } else {
      display = (this.rounds.length <= 9) ?
          "0" + this.rounds.length.toString() :
          this.rounds.length;
    }

    return (
        <div id="display">
          <span id="strict"
                style={{color: strictColor}}>
            s
          </span>
          <span id="round"
                style={{color: roundColor}}>
            {display}
          </span>
        </div>
    )
  }

  renderButtons = () => (
      <div id="buttons">
        <div className="button"
             id="btn_start"
             onClick={() => this.mainLogic(-1)}>
          start
        </div>
        <div className="button"
             id="btn_strict"
             onClick={this.handleStrictClick}>
          strict
        </div>
      </div>
  )

  render() {
    return (
        <div id="main_container">
          {this.renderColorButtons()}
          <div id="center">
            {this.renderDisplay()}
            {this.renderButtons()}
          </div>
        </div>
    )
  }
}


// *****************************************************************************


class Sound {

  constructor(context) {
    this.context = context;
  }

  init() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'sine'
  }

  play(value, time) {
    this.init();
    this.oscillator.frequency.value = value;
    this.gainNode.gain.setValueAtTime(1, time);
    this.oscillator.start(time);
    this.stop(time)
  }

  stop(time) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 2);
    this.oscillator.stop(time + 2)
  }
}