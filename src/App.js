import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Planets from './planets/planets';
import Characters from './charachters/character';
import Starships from './starships/starships';

export default function App() {
  return (
    <Router>
      <div className='jumbotron rounded'>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link to="/" className ="nav-link active" aria-current="page" href="#">Characters</Link>
            </li>
            <li className="nav-item">
              <Link to="/planets" className="nav-link">Planets</Link>
            </li>
            <li className="nav-item">
              <Link to="/starships" className="nav-link">Starships</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/planets">
            <Planets />
          </Route>
          <Route path="/starships">
            <Starships />
          </Route>
          <Route path="/">
            <Characters />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}