import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

const spaceStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        marginLeft: theme.spacing(3),
      },
    },
  }));

const questionStyles = makeStyles(theme => ({
    root: {
      '& < *': {
        margin: theme.spacing(1),
      },
    },
    // marginLeft: 585,
  }));

const optionStyles = makeStyles({
    root: {
        marginLeft: 30,
        marginTop: 10,
    },
});

const spaceOption = makeStyles(theme => ({
    root: {
       marginLeft: 20,
       marginBottom: 10,
      '& > *': {
        marginRight: theme.spacing(32),
      },
     
    },
  }));

const playStyles = makeStyles({
    root: {
      marginTop: 20,
      marginBottom: 25,
    },
});
const cardStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        height: 140,
        width: 100,
      },
    media: {
        paddingTop: '100%', // 16:9
      },
  }));

const GridStyles = makeStyles({
  root: {
    maxWidth: 275,
    marginTop: 80,
    marginLeft: 585,
    marginBottom: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    paddingTop: '100%', // 16:9
  },
});

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      marginTop: 80,
      marginLeft: 305,
      marginRight: 309,
      marginBottom: 30,
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0),
        marginLeft: theme.spacing(3),
        width: theme.spacing(30),
        height: theme.spacing(25),
      },
    },
  }));

function PlayChallenge() {
    const classes = useStyles();
    const playclasses = playStyles();
    const questionclasses = questionStyles();
    const spaceclasses = spaceStyles();
    const optionclasses = optionStyles();
    const spaceOptClasses = spaceOption();
    const cardClasses = cardStyles();
    const gridClasses = GridStyles();
    return (
        <div>
            {/* We will be grabbing this info from the database, but for right now, it is being hardcoded with this image of Rihanna  */}   
    <div>
    {/* <Grid container className={cardClasses.root}>
      <Grid item xs={12}>
        <Grid container justify="center">
        </Grid>
      </Grid>
      <Grid item xs={12}>
      </Grid>
    </Grid> */}

    <Card className={classes.root}>
    <Card>
        <CardContent>
          <Typography>
            BEST
          </Typography>
          <Typography>
            Person 1
          </Typography>
          <Typography>
            Person 2
          </Typography>
          <Typography>
            Person 3
          </Typography>
          <Typography>
            Person 4
          </Typography>
          <Typography>
            Person 5
          </Typography>
        </CardContent>
      </Card>

      <Card className={classes.root}>
        <CardMedia 
        className={classes.media}
        image="https://i.pinimg.com/474x/3f/8e/b5/3f8eb5aba691de25ec03458d5614246b--playlist-rihanna.jpg"
        title="Paella dish"
      />
      </Card>

    <Card>
        <CardContent>
          <Typography>
            Friends
          </Typography>
          <Typography>
            Person 1
          </Typography>
          <Typography>
            Person 2
          </Typography>
          <Typography>
            Person 3
          </Typography>
          <Typography>
            Person 4
          </Typography>
          <Typography>
            Person 5
          </Typography>
        </CardContent>
      </Card>
    </Card>
    
    </div>

    <div className = {questionclasses.root}>
    <Typography variant="h5" gutterBottom className={spaceclasses.root}>
        Choose the correct singer and song Title?  
        <Button variant="outlined" color="primary"> {/* Needs to go to the next song, need to right the code to do that  */}
         Next
        </Button>  
      </Typography>

    </div>
    <div className ={playclasses.root}>
    <Button variant="outlined" color="primary">
        Play Song
      </Button>
      </div>
        <div className = {optionclasses.root}>
            <Button variant="outlined" color="primary" className = {spaceOptClasses.root} >
                Option Artist 1, Song 1 
            </Button>
            <Button variant="outlined" color="primary" className = {spaceOptClasses.root}>
                Option Artist 2, Song 2
            </Button>
        </div>
        <div className = {optionclasses.root}>
            <Button variant="outlined" color="primary" className = {spaceOptClasses.root} >
                Option Artist 3, Song 3 
            </Button>
            <Button variant="outlined" color="primary" className = {spaceOptClasses.root}>
                Option Artist 4, Song 4
            </Button>
        </div>
      </div>
    );
  }
  export default PlayChallenge;