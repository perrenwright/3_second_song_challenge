import React from 'react';
// import logo from './logo.svg';
import './App.css';
import MenuAppBar from './components/appNav';
import globalleaderboard from './components/globalleaderboard';
import challenges from './components/challenges';
import about from './components/about';
import contactus from './components/contactus';
import { Route, Switch} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MenuAppBar /> 
      </header>
      <Switch>
        <Route path='/globalleaderboard' component={globalleaderboard} />
        <Route path='/challenges' component={challenges} />
        <Route path='./about' component={about} />
        <Route path='./contactus' component={contactus} />
      </Switch>
    </div>
  );
}

export default App;
