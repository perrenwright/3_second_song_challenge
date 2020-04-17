import React from 'react';
import {Howl, Howler} from 'howler';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import playsong from './playsong.js'
import { getChallengeUtil } from '../getChallengeUtil';
import {useState,useEffect} from 'react';
import {GAME_STATE} from '../gamestate_enum.js';
import EndPage from  './endChallenge.js'

// spacing 
const spaceStyles = makeStyles(theme => ({
    root: {
      color: '#19869E',
      '& > *': {
        marginLeft: theme.spacing(3),
        color: '#19869E',
      },
    },
  }));

//question styles 
const questionStyles = makeStyles(theme => ({
    root: {
      color: '#19869E',
      '& < *': {
        margin: theme.spacing(1),
        color: '#19869E',
      },
    },

  }));


const optionStyles = makeStyles({
    root: {
        color: '#19869E',
        marginTop: 10,
    },
});

const spaceOption = makeStyles(theme => ({
    root: {
       color: '#19869E',
       marginLeft: 20,
       marginBottom: 10,
      '& > *': {
        color: '#19869E',
        marginRight: 30,
      },
      width: 480,
    },
  }));

const playStyles = makeStyles({
    root: {
      marginTop: 20,
      marginBottom: 25,
      color: '#19869E',
    },
});
const cardStyles = makeStyles(theme => ({
    media: {
        paddingTop: '100%', // 16:9
      },
  }));

const GridStyles = makeStyles({
  root: {
    color: '#19869E',
    marginBottom: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
  },
  title: {
    fontSize: 14,
    color: '#19869E',
  },
  pos: {
    marginBottom: 12,
    color: '#19869E',
  },
  media: {
    paddingTop: '100%', 
    borderRadius: 20,
    height: 250,
    width: 250, // 16:9
    color: '#19869E',
  },
});

const useStyles = makeStyles(theme => ({
    root: {
      display: 'table',
      marginTop: 20,
      marginLeft: 360,
      marginRight: 200,
      marginBottom: 30,
      color: '#19869E',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0),
        marginLeft: theme.spacing(0),
        width: theme.spacing(40),
        height: theme.spacing(40),
        color: '#19869E',
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
    const [gameState, setGameState] = useState(GAME_STATE.IN_PROGRESS);
    console.log(data)
    var all_challenge_data = data["data"]
    var questions = all_challenge_data["challenge_questions"]
    // Questions contains the challenge passed into from data.
    var choice_A = questions[i]["choice_A"]
    var choice_B = questions[i]["choice_B"]
    var choice_C = questions[i]["choice_C"]
    var choice_D = questions[i]["choice_D"]
    var right_choice = questions[i]["right_choice"]
    var url = questions[i]["preview_url"]
    var playlist_image = all_challenge_data["challenge_image"]
    var playlist_name = all_challenge_data["challenge_name"]
    var high_score = all_challenge_data["highest_score"]
    var challenge_id = all_challenge_data["challenge_id"]
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
    if (i + 1 > 5)
    {
      setGameState(GAME_STATE.ENDED)
      set_i(0)
    }

    return (


 <div>
 { gameState === GAME_STATE.ENDED &&
   <div>
    <EndPage score={score} high_score={high_score} challenge_id={challenge_id}/>
    </div>
}
          {/* Someone needs to make the button green or red when a choice is picked. We also need to display an ending page. */}
    { gameState === GAME_STATE.IN_PROGRESS &&
    <div>

      <Card className={classes.root}>
        <CardMedia
        className={classes.media}
        image={playlist_image}
        title={playlist_name}
      />
      </Card>



    </div>
}
{ gameState === GAME_STATE.IN_PROGRESS &&
    <div className = {questionclasses.root}>
    <Typography variant="h5" gutterBottom className={spaceclasses.root}>
        Choose the correct singer and song Title?
        <Button variant="outlined" onClick={() => set_i(i + 1)}>
         Next
        </Button>
      </Typography>

    </div>
  }
  { gameState === GAME_STATE.IN_PROGRESS &&
    <div className ={playclasses.root}>
    <Button variant="outlined" onClick={start} >
        Play Song
      </Button>
      </div>
}
{ gameState === GAME_STATE.IN_PROGRESS &&
        <div className = {optionclasses.root}>
            <Button variant="outlined"  className = {spaceOptClasses.root} onClick={() => setChoice(choice_A)} >
               {choice_A}
            </Button>
            <Button variant="outlined" className = {spaceOptClasses.root} onClick={() => setChoice(choice_B)}>
               {choice_B}
            </Button>
        </div>
}
{ gameState === GAME_STATE.IN_PROGRESS &&
        <div className = {optionclasses.root}>
            <Button variant="outlined"  className = {spaceOptClasses.root} onClick={() => setChoice(choice_C)} >
               {choice_C}
            </Button>
            <Button variant="outlined"  className = {spaceOptClasses.root} onClick={() => setChoice(choice_D)}>
                {choice_D}
            </Button>
        </div>
} <hr/>
      </div>


    );
  }
  export default PlayChallenge;