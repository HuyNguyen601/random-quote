import React, {Component} from 'react';
import './App.css';


function sendRequest()
{
    return new Promise((resolve, reject) => {
    const url = "https://gist.githubusercontent.com/dmakk767/9375ff01aff76f1788aead1df9a66338/raw/491f8c2e91b7d3b8f1c8230e32d9c9bc1a1adfa6/Quotes.json%2520";
    const xml = new XMLHttpRequest();
    xml.open("GET", url, true);
    xml.onload = ()=>resolve(xml.responseText);
    xml.onerror = ()=>reject(xml.statusText);
    xml.send();
  });

}
const firstLoad = [{
"quote" : "Life isn’t about getting and having, it’s about giving and being.",
"name": "Kevin Kruse"
},
{
"quote" : "Whatever the mind of man can conceive and believe, it can achieve.",
"name" : "Napoleon Hill"
},
{
"quote" : "Strive not to be a success, but rather to be of value.",
"name" : "Albert Einstein"
},
{
"quote" : "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
"name" : "Robert Frost"
}];

class App extends Component {
  constructor(props) {
    super(props);
    const randomIndex = Math.floor(Math.random()*Math.floor(4));
    this.state = {
      quote: firstLoad[randomIndex].quote,
      author: firstLoad[randomIndex].name
    };
    this.getQuote = this.getQuote.bind(this);
  }



  getQuote()
  {
    const promise = sendRequest();
    promise.then(function (res){
      const max = 102;
      const randomIndex = Math.floor(Math.random()*Math.floor(max));
      const result = {
        quote: JSON.parse(res)[randomIndex].quote,
        author: JSON.parse(res)[randomIndex].name
      };
      this.setState(result);
    }.bind(this)).catch(function (error){
      console.log(error);
    });
  }

  handleClick(e){
    e.target.href = "https://twitter.com/intent/tweet?text="+ this.state.quote;
  }


  render() {
    return (
      <div id="quote-box" className="wrapper center">
        <div class="quote" id="text">{this.state.quote}</div>
        <div className="author" id="author">{this.state.author}</div>
        <button id="new-quote" type="submit" onClick={this.getQuote}>New Quote</button>
        <a id="tweet-code" onClick = {e=>this.handleClick(e)}className="button">Tweet</a>
      </div>
    );
  }
}

export default App;

/*
xml.onreadystatechange = function ()
{
  if(xml.readyState === 4 && xml.status === 200)
  {
      const max = 102;
      const data = xml.responseText;
      const randomIndex = Math.floor(Math.random()*Math.floor(max));
      const result = {
        quote: JSON.parse(data)[randomIndex].quote,
        author: JSON.parse(data)[randomIndex].name
      };
      callback.apply(result);
  }
}
*/
