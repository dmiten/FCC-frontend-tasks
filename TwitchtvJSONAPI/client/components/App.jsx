"use strict"

import React from "react";

import {
  Dimmer,
  Segment,
  Loader,
  Image,
} from 'semantic-ui-react';

import "./App.css";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.names = [
      "ESL_SC2",
      "OgamingSC2",
      "cretetion",
      "freecodecamp",
      "storbeck",
      "habathcx",
      "RobotCaleb",
      "noobs2ninjas"
    ],
    this.api = "https://wind-bow.glitch.me/twitch-api",
    this.state = {
      loading: true,
      filter: "all",
      content: {}
    };
    this.names.map(name =>
        this.state.content[name] = {
          name: name,
          logo: null,
          banner: "",
          link: "",
          stream: null
        }
    )
  }

  componentWillMount() {
    this.getContent()
  }

  getContent = () => {
    let content = {};
    Object.assign(content, this.state.content);
    Promise.all(this.names.map(name => fetch(this.api + "/channels/" + name)
        .then(response => response.json())
        .then(data => {
          content[name] = {
            name: data.display_name,
            logo: data.logo,
            banner: data.profile_banner,
            link: data._links.self };
          return fetch(this.api + "/streams/" + name)
        })
        .then(response => response.json())
        .then(data => {
          if (data.stream) {
            content[name].stream = {
              game: data.stream.game,
              preview: data.stream.preview.medium,
              link: data.stream._links.self };
          } else content[name].stream = null;
          return content => content
        })
    ))
    .then(() => this.setState({ content: content, loading: false}))
    .catch((error) => console.log("fetching details error: ", error.message))
  }

  renderMenu = (props) => {
    let allActive, onlineActive, offlineActive;
    switch (props.filter) {
      case "all": {
        allActive = " active";
        onlineActive = "";
        offlineActive = ""
      }
        break;
      case "online": {
        allActive = "";
        onlineActive = " active";
        offlineActive = ""
      }
        break;
      case "offline": {
        allActive = "";
        onlineActive = "";
        offlineActive = " active"
      }
        break;
    }
    return (
        <div id="menu" className="ui inverted three item menu">
          <a className={"orange item" + allActive}
            onClick={() => this.setState({ filter: "all" })}>
            all
          </a>
          <a className={"orange item" + onlineActive}
             onClick={() => this.setState({ filter: "online" })}>
            online
          </a>
          <a className={"orange item" + offlineActive}
             onClick={() => this.setState({ filter: "offline" })}>
            offline
          </a>
        </div>
    )
  }

  renderList = (props) => {
    let _logo,
        renderImage = (logo) => {
          if (logo !== null) _logo = logo;
            else _logo = "https://jpk-image-hosting.s3.amazonaws.com/" +
                          "twitch-app/no-image-available.jpg";
          return <Image src={_logo}
                        size="tiny"
                        shape="rounded"
                        className="channel_pic" />
        },
        renderStream = (stream) => {
          if (!stream) return "status: offline";
          else return (
              <div className="stream">
                status: online
                <Image src={stream.preview}
                       size="small"
                       className="stream_logo" />
                <a href={stream.link} target="_blank">
                  {stream.game}
                </a>
              </div>
          );
        },
        renderOne = (channel) => {
          return (
              <div className="ui inverted segment" id="channel"
                   key={channel.name + JSON.stringify(channel.stream)}>
                <div className="channel_logo">
                  {renderImage(channel.logo)}
                  <a href={channel.link} target="_blank">
                    {channel.name}
                  </a>
                </div>
                <div>
                  {renderStream(channel.stream)}
                </div>
              </div>
          )
        },
        filter = (name, props) => {
          switch (props.filter) {
            case "all": return true;
            case "online": return (!!props.content[name].stream);
            case "offline": return (!props.content[name].stream);
          }
        };

    return (
        <div id="list">
          {this.names.filter(name => filter(name, this.state))
            .map(name => renderOne(props.content[name]))}
        </div>
    )
  }


    render() {
      console.log("render state: ", this.state)
      return (
          <div id="main_container">
            <Dimmer active={this.state.loading} />
            <Loader inverted active={this.state.loading}>
              Loading
            </Loader>
            {this.renderMenu(this.state)}
            {this.renderList(this.state)}
          </div>
      )
  }
}