import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import MenuAppBar from './components/appNav';
import globalleaderboard from './components/globalleaderboard';
import challenges from './components/challenges';
import about from './components/about';
import Contact from './components/contact';
import getToken from './GetToken';
import getPlaylistInfo from './getPlaylistInfo';
import { Route, Switch, useLocation } from 'react-router-dom';
import Homepage from './components/homepage';
import addchallenge from './components/addChallenge';
// import PrivateRoute from './components/PrivateRoute';
// import {getLocalToken} from './token';
import Delete from './components/delete';


// const StyledButton = withStyles({
//   root: {
//     background: '#19869E',
//     borderRadius: 10,
//     border: 0,
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//     boxShadow: '0 3px 5px 2px rgba(250, 250, 250, 250)',
//     marginRight: '80%',
//     top: '240px'
//   },
//   label: {
//     textTransform: 'capitalize'
//   }
// })(Button);

export default function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const token = getToken();
  const location = useLocation();
  getPlaylistInfo(token);
  useEffect(()=> {
    if (location.pathname === "/homepage" ) {
      setloggedIn(true);
    }
  }, [location.pathname])
  return (
    <div className="App">
      <header className="App-header">
        {loggedIn === true && <MenuAppBar />}
        <Switch>
          <Route path="/" exact component={about} />
          <Route path="/homepage" exact component={Homepage} />
          <Route path="/globalleaderboard" component={globalleaderboard} />
          <Route path="/challenges" component={challenges} />
          <Route path="/about" component={about} />
          <Route path="/contact" component={Contact} />
          <Route path="/addchallenge" component={addchallenge} />
        
          {/* To activate authentication in each page, simply uncomment the PrivateRoute and comment the Route particular to that route. */}
          {/* <PrivateRoute exact path="/globalleaderboard" redirectTo='/' component={globalleaderboard} user_token={getLocalToken()}/>
          <PrivateRoute exact path="/challenges" redirectTo='/' component={challenges} user_token={getLocalToken()}/>
          <PrivateRoute exact path="/about" redirectTo='/' component={about} user_token={getLocalToken()}/>
          <PrivateRoute exact path="/contact" redirectTo='/' component={contact} user_token={getLocalToken()}/>
          <PrivateRoute exact path="/addchallenge" redirectTo='/' component={addchallenge} user_token={getLocalToken()}/> */}
          <Route path="/delete" component={Delete} />  
        </Switch>
      </header>
    </div>
  );
}
