import React, { Component} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";

import axios from "axios";
import { Layout,Input } from "antd";
const { Header, Footer, Content, Sider, } = Layout;
const { Search } = Input;


class appRouter extends Component { 
  constructor(props) {
    super(props);
    //console.log("context",this.context);
    this.state = {
      cards: [],
      shortenUrl: ""
    };
  }

  UpdateURLText = val =>{
    console.log("data",val);
    axios
    .get(
      "https://cors-anywhere.herokuapp.com/https://6jyi4w7nj5.execute-api.us-east-1.amazonaws.com/crontest",
      {
        params: {
          url: val
        }
      },
      { headers: { "Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS" } }
    )
    .then(res => {
      var temp = this.state;
      temp["shortenUrl"] = res.data;
      this.setState(temp);
      console.log("here",res);
    });

  }

  openUrl = val =>{
    window.open(val);
  }



  render() {
    return (
      
      <div class='container' >
       <h2>URL SHORTENING SERVICES</h2>
       <Search
      placeholder="Paste URl here"
      enterButton="SHORTEN URL"
      size="large"
      onSearch={value => this.UpdateURLText(value)}
    />
      <Search
      placeholder="SHORTEN URL"
      enterButton="GOTO URL"
      value ={this.state.shortenUrl}
      onSearch={value => this.openUrl(value)}
      size="large"
    />

      </div>
                
      
    );
  }
}

export default appRouter;
