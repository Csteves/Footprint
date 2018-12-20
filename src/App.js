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

//  async componentDidMount(){
//     let res = await axios.get(`/api/get`)
//     // let data = JSON.parse(res.data);
//     console.log(res.data);
//   }
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
