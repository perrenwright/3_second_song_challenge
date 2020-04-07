import React from 'react';
import {Howl, Howler} from 'howler';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import playsong from './playsong.js'
import { getChallengeUtil } from '../getChallengeUtil';
import {useState,useEffect} from 'react';


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

function PlayChallenge(data) {
    const classes = useStyles();
    const playclasses = playStyles();
    const questionclasses = questionStyles();
    const spaceclasses = spaceStyles();
    const optionclasses = optionStyles();
    const spaceOptClasses = spaceOption();
    const cardClasses = cardStyles();
    const gridClasses = GridStyles();

    const [i, set_i] = useState(0);
    const [choice, setChoice] = useState("");
    const [score, setScore] = useState(0);

    var questions = data["data"]
    // Questions contains the challenge passed into from data.
    var choice_A = questions[i]["choice_A"]
    var choice_B = questions[i]["choice_B"]
    var choice_C = questions[i]["choice_C"]
    var choice_D = questions[i]["choice_D"]
    var right_choice = questions[i]["right_choice"]
    var url = "https://p.scdn.co/mp3-preview/7d7b21c22e4408cab450115286c248a84196bac8?cid=9a9b0b83d79a4ece84e608715bc5e114";
    var playlist_image = "Not in database"
    // We extract the necessary components we would like to display. Playlist image and preview_url are not in the database.
    var sound = new Howl({
      src: [url],
      html5: true,
      format: ['mp3', 'aac']
    });
    var count = 0
    const start = () => {
      playsong(url,count,sound);
      count = 1
      // This count stops the user from playing the sound more than once.
    }

    if (choice === right_choice){
          setScore(score + 1);
          setChoice("")
          console.log(score)
    // I track the user's current score here.
    }

    return (
        <div>
            {/* Someone needs to make the button green or red when a choice is picked. We also need to display an ending page. */}
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
        <Button variant="outlined" color="primary" onClick={() => set_i(i + 1)}>
         Next
        </Button>
      </Typography>

    </div>
    <div className ={playclasses.root}>
    <Button variant="outlined" color="primary" onClick={start}>
        Play Song
      </Button>
      </div>
        <div className = {optionclasses.root}>
            <Button variant="outlined" color="primary" className = {spaceOptClasses.root} onClick={() => setChoice(choice_A)} >
               {choice_A}
            </Button>
            <Button variant="outlined" color="primary" className = {spaceOptClasses.root} onClick={() => setChoice(choice_B)}>
               {choice_B}
            </Button>
        </div>
        <div className = {optionclasses.root}>
            <Button variant="outlined" color="primary" className = {spaceOptClasses.root} onClick={() => setChoice(choice_C)} >
               {choice_C}
            </Button>
            <Button variant="outlined" color="primary" className = {spaceOptClasses.root} onClick={() => setChoice(choice_D)}>
                {choice_D}
            </Button>
        </div>
      </div>
    );
  }
  export default PlayChallenge;