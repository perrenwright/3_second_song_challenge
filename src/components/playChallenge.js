import React from 'react';
import {Howl} from 'howler';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import playsong from './playsong.js'
import {useState} from 'react';
import {GAME_STATE} from '../gamestate_enum.js';
import EndPage from  './endChallenge.js'
import './playChallenge.css';


const spaceStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginLeft: theme.spacing(3),
    },
  },
}));

const questionStyles = makeStyles((theme) => ({
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


const useStyles = makeStyles((theme) => ({
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
  const [colors,setColors] =useState(['','','',''])
  const [i, set_i] = useState(0);
  const [choice, setChoice] = useState("");
  const [isDisabled, setDisabled] = useState(false)
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
  function checkAnswer(choice,index) {
    setChoice(choice)
    if (choice === right_choice){
      colors[index] = '#48BF84'
      setColors(colors)
      setDisabled(true);
      console.log(colors)
      setScore(score + 1);
      setChoice("")
      console.log(score)
    
    // I track the user's current score here.
    if (i + 1 > 5) {
    setGameState(GAME_STATE.ENDED)
    set_i(0)
    }
    return true
    }
    else {
      colors[index] = '#D80032'
      let choicesLst = [choice_A,choice_B,choice_C,choice_D];
      for (let i = 0; i < 4; i++) {
        if (right_choice === choicesLst[i]) {
          colors[i] = '#48BF84';
          break;
        }
      }
      setColors(colors)
      console.log(colors)
      }
    
    setDisabled(true);
    return false;
  }

  function changeQuestion() {
    set_i(i+1);
    setDisabled(false)
    setColors(['','','',''])
  }

  return (
    <div>
      { 
        gameState === GAME_STATE.ENDED &&
        <div>
          <EndPage score={score} high_score={high_score} challenge_id={challenge_id}/>
        </div>
      }
      { 
        gameState === GAME_STATE.IN_PROGRESS &&
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
      { 
        gameState === GAME_STATE.IN_PROGRESS &&
        <div className = {questionclasses.root}>
          <Typography variant="h5" gutterBottom className={spaceclasses.root}>
              Choose the correct singer and song Title?
          <Button variant="outlined" color="primary" onClick={() => changeQuestion()}>
              Next
          </Button>
          </Typography>
        </div>
      }
      { 
        gameState === GAME_STATE.IN_PROGRESS &&
        <div className ={playclasses.root}>
          <Button variant="outlined" color="primary" onClick={start}>
              Play Song
          </Button>
        </div>
      }
      { 
        gameState === GAME_STATE.IN_PROGRESS &&
          <div className = {optionclasses.root}>
            <Button disabled={isDisabled} variant="outlined" color='primary' style={{ marginBottom: 40,marginLeft: 30,
                marginTop: 10,background: colors[0]}} onClick={() => checkAnswer(choice_A,0)} >
               {choice_A}
            </Button>
            <Button disabled={isDisabled} variant="outlined" color="primary" style= {{ marginBottom: 40,marginLeft: 30,
                marginTop: 10,background: colors[1]}} onClick={() => checkAnswer(choice_B,1)}>
               {choice_B}
            </Button>
          </div>
      }
      { 
        gameState === GAME_STATE.IN_PROGRESS &&
        <div className = {optionclasses.root}>
            <Button disabled={isDisabled} variant="outlined" color='primary' style={{marginBottom: 40,marginLeft: 30,
                marginTop: 10,background: colors[2]}}  onClick={() => checkAnswer(choice_C,2)} >
               {choice_C}
            </Button>
            <Button disabled={isDisabled} variant="outlined" color="primary" style={{ marginBottom: 40,marginLeft: 30,
                marginTop: 10,background: colors[3]}}onClick={() => checkAnswer(choice_D,3)}>
                {choice_D}
            </Button>
        </div>
      }
    </div>
  );
}
  export default PlayChallenge;
