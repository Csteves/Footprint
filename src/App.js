import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import routes from './routes';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
    }
  }

  render() {
    return (
      <div className="App">
            <Nav/>
            {routes}
      </div>
    );
  }
}

export default App;
