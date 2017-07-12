"use strict"

import React from "react";

import {
  Form,
  FormControl,
  Image,
  InputGroup,
  Jumbotron,
  PageHeader
} from "react-bootstrap";

import "./App.css";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.api = "https://en.wikipedia.org/w/api.php?format=json&action=query&" +
        "generator=search&origin=*&gsrnamespace=0&gsrlimit=20&" +
        "prop=pageimages|extracts&pilimit=max&exintro&" +
        "explaintext&exsentences=1&exlimit=max&";
    this.state = {
      alterButton: false,
      articles: {},
      value: "",
      offset: 0
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value, alterButton: false });
  }

  handleSubmit = (event) => {
    this.getArticles(0);
    event.preventDefault()
  }

  handleReset = () => {
    this.setState({ value: "", articles: {}, offset: 0 });
  }

  renderAlterButton = () => {
    if (this.state.value === "") {
      return (
          <div id="alterbutton">
            <a href="https://en.wikipedia.org/wiki/Special:Random"
               target="_blank">
              random article
            </a>
          </div>
      )}
    else if (this.state.alterButton) {
      return (
          <div id="alterbutton">
            no results
          </div>
      )}
    return
  }

  renderArticles = () => {
    let ids = Object.keys(this.state.articles);
    return (
        <div name="top">
          {ids.map((id) => renderOne(this.state.articles[id]))}
        </div>
    );

    function renderOne(article) {
      let imgSrc = "",
          base = "https://en.wikipedia.org/?curid=";
      if (article.thumbnail) imgSrc = article.thumbnail.source;
      return (
          <Jumbotron key={article.pageid} id="article">
            <div id="line">
              {article.extract}
              <div>
                <Image id="thumbnail" src={imgSrc}/>
              </div>
            </div>
            <a href={base + article.pageid} target="_blank">
              Wikipedia
            </a>
          </Jumbotron>
      )
    }
  }

  renderButtonNext = () => {
    if (this.state.offset) {
      return (
          <div id="alterbutton">
            <a  onClick={() => this.getArticles(this.state.offset)} href="#top">
              load next
            </a>
          </div>
      )
    }
    return
  }

  getArticles = (offset) => {
    fetch(this.api + "gsroffset=" + offset + "&gsrsearch=" + this.state.value)
    .then((res) => res.json())
    .then((data) => {
      if (data.continue) offset = data.continue.gsroffset;
      this.setState({articles: data.query.pages, offset: offset})
    })
    .catch((e) => {
      if (e.message == "Cannot read property 'pages' of undefined") {
        this.setState({alterButton: true})
      }
    })
  }

  render() {
    return (
        <div id="main">
          <PageHeader id="header">
            <form onSubmit={this.handleSubmit}>
              <InputGroup id="input">
                <FormControl
                    id="form"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="enter to search">
                </FormControl>
                <InputGroup.Addon id="reset" onClick={this.handleReset}>
                  x
                </InputGroup.Addon>
              </InputGroup>
            </form>
          </PageHeader>
          <div id="articles">
            {this.renderAlterButton()}
            {this.renderArticles()}
            {this.renderButtonNext()}
          </div>
        </div>
    )
  }
}