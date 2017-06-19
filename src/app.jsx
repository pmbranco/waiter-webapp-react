import React, { Component } from 'react'
import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <HashRouter >
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/coucou' component={Address} />
        </div>
      </HashRouter>
    )
  }
}

const Home = () => <h1>Hello from Home!</h1>
const Address = () => <h1>coucou</h1>

export default App