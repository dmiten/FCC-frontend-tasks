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
    playerAi: "ai",
    playerHuman: "human",
    message: {
      empty: "0 125px",
      tie: "0 90px",
      winAi: "0 60px",
      winHuman: "0 30px"
    }
  })

  initialState = () => ({
    offset: Array(9).fill(0),
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    message: this.const.message.empty,
    nextMove: "",
    offsetAi: 0,
    offsetHuman: 0,
    round: 0
  })

  reset = () => this.setState(this.initialState())

  randomOffset = start =>
    start - Math.floor(Math.random() * 3) * 75

  availableCells = board =>
      board.filter(cell => cell != this.const.playerAi
        && cell != this.const.playerHuman)

  isWin = (board, player) => {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return true
    } else {
      return false
    }
  }

  move = (index, player, offset) => {
    let _state = Object.assign({}, this.state);
    _state.round ++;
    _state.board[index] = player;
    _state.offset[index] = this.randomOffset(offset);
    _state.nextMove = (_state.nextMove == this.const.playerAi) ?
        this.const.playerHuman :
        this.const.playerAi;
    if (this.isWin(_state.board, player)) {
      _state.message = (player == this.const.playerAi) ?
          this.const.message.winAi :
          this.const.message.winHuman;
      _state.round = 10
    } else if (_state.round == 9) {
      _state.message = this.const.message.tie
    };
    this.setState(_state)
  }

  minimax = (board, player) => {
    let availableCells = this.availableCells(board),
        moves = [],
        bestMove;
    if (this.isWin(board, this.const.playerHuman)) {
      return {score: -1}
    }
    else if (this.isWin(board, this.const.playerAi)) {
      return {score: 1}
    }
    else if (availableCells.length == 0) {
      return {score: 0}
    }
    for (let i = 0; i < availableCells.length; i++) {
      let move = {},
          result;
      move.index = board[availableCells[i]];
      board[availableCells[i]] = player;
      if (player == this.const.playerAi) {
        result = this.minimax(board, this.const.playerHuman);
        move.score = result.score
      } else {
        result = this.minimax(board, this.const.playerAi);
        move.score = result.score
      }
      board[availableCells[i]] = move.index;
      moves.push(move)
    }
    if (player == this.const.playerAi) {
      let bestScore = -100;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i
        }
      }
    } else {
      let bestScore = 100;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i
        }
      }
    }
    return moves[bestMove]
  }

  aiLogic = () => {
    let index = this.state.round ?
      this.minimax(this.state.board, this.const.playerAi).index :
      Math.floor(Math.random() * 9);
    this.move(index, this.const.playerAi, this.state.offsetAi)
  }

  handleTableClick = (index) => {
    if (this.state.nextMove != this.const.playerHuman
        || this.state.board[index] == this.const.playerAi
        || this.state.board[index] == this.const.playerHuman
        || this.state.round >= 9) return;
    this.move(index, this.const.playerHuman, this.state.offsetHuman)
  }

  handleButtonsClick = (figure) => {
    this.reset();
    if (figure == "x") {
      this.setState({
        nextMove: this.const.playerHuman,
        offsetAi: -75,
        offsetHuman: -300
      })
    } else {
      this.setState({
        nextMove: this.const.playerAi,
        offsetAi: -300,
        offsetHuman: -75
      })
    }
  }

  renderTable = () => {
    let left = 40,
        top = 10,
        backgroundPosition,
        cells = [],
        renderOneCell = index =>
            <div className="cell"
                 key={index}
                 onClick={() => this.handleTableClick(index)}
                 style={{
                   backgroundPosition: this.state.offset[index],
                   left: left,
                   top: top
                 }}>
            </div>;
    for (let i = 0; i <= 6; i += 3) {
      for (let j = 0; j <= 2; j++) {
        cells.push(renderOneCell(i + j));
        left += 100
      }
      left = 40;
      top += 100
    }
    return (
        <div id="table">
          {cells}
        </div>
    )
  }

  renderButtons = () =>
      <div id="buttons">
        <div className="button"
             data-position="top right"
             data-tooltip="reset & play as x"
             id="buttonX"
             onClick={() => this.handleButtonsClick("x")}>
        </div>
        <div className="button"
             data-position="top left"
             data-tooltip="reset & play as o"
             id="buttonO"
             onClick={() => this.handleButtonsClick("o")}>
        </div>
      </div>

  renderMessage = () =>
    <div id="message"
         style={{backgroundPosition: this.state.message}}>
    </div>

  componentDidUpdate(prevProps, prevState) {
    if (this.state.nextMove == this.const.playerAi) {
      this.aiLogic()
    }
  }

  render() {
    return (
        <div id="main_container">
          {this.renderTable()}
          {this.renderMessage()}
          {this.renderButtons()}
        </div>
    )
  }
}