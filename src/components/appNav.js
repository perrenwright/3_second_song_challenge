import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import './appNav.css';
import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
// eslint-disable-next-line
const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = React.useState(0);
  const createHistory = require("history").createBrowserHistory;

  const handleEvent = (event, newValue) => {
    setValue(newValue);
  };
  // eslint-disable-next-line
  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    localStorage.clear();
    let history = createHistory();
    history.push("/about");
    let pathUrl = window.location.href;
    window.location.href = pathUrl;
  };

  const handleOut = () => {
    setAnchorEl(null);
  };


  return (
    <div className={classes.root}>

      <AppBar position="static" style={{ background: 'white', color: 'black', boxShadow: 'Light'}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img
              className="appNav-3SecondLogo"
              src="https://lh3.googleusercontent.com/-RDigpJXnuR0/Xl6uQ5qxvnI/AAAAAAAAAE8/wJJ349F9mcwMhrl4qlooXW2iBwo61v3TwCK8BGAsYHg/s0/2020-03-03.png"
              alt="3 Second Logo"
            />
          </IconButton>
          <Tabs
            value={value}
            onChange={handleEvent}
            aria-label="simple tabs example"
            indicatorColor="primary"
            centered
          >
            <Tab
              style={{marginRight: '40px'}}
              label="Challenges"
              {...a11yProps(0)}
              to="/challenges"
              component={Link}
            />
            <Tab
              label="Global Leaderboard"
              {...a11yProps(1)}
              to="/globalleaderboard"
              component={Link}
            />
            {/* <Tab label="About" {...a11yProps(2)} to="/about" component={Link} /> */}
            <Tab
              label="Add"
              {...a11yProps(3)}
              to="/addchallenge"
              component={Link}
            />
            <Tab
              label="Delete"
              {...a11yProps(3)}
              to="/delete"
              component={Link}
            />
            <Tab
              label="Contact Us"
              {...a11yProps(3)}
              to="/contact"
              component={Link}
            />
             </Tabs>


          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                edge="end"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleOut}
              >
                {/* <MenuItem onClick={handleEvent} to="/profile" component={Link}> Profile</MenuItem> */}
                <MenuItem onClick={handleClose}>Sign Out</MenuItem>
                {/* Should change Account to Sign Out... */}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Link to="/challenges"> </Link>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Link to="/globalleaderboard"></Link>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Link to="/about"></Link>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Link to="/contact"></Link>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Link to="/playchallenge"></Link>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Link to="/delete"></Link>
      </TabPanel>

    </div>
  );
}
