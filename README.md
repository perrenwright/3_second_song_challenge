## 3 Second Song Challenge

The Song Challenge Web App is a React app that uses Firebase as the backend. We maintain most of the logic within the user browser with some calls to the Spotify Web API. 

The single player mode allows the user to select a challenge that they would like to attempt. Users will attempt to guess the title of songs that are played for a specified duration of time. For example, the user may choose 3 seconds to listen to a song and identify it from the four options that are provided to them. 

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
 
## Clone the repository
https://github.com/perrenwright/3_second_song_challenge.git

Navigate to the repository directory:

  `cd 3_second_song_challenge`
 
## Prerequisites
What things you need to install the software and how to install them:

NPM

Firebase

## Installing
A step by step series of examples that tell you how to get a development env running

If you have not installed npm please navigate to this site and follow the steps:

`https://www.npmjs.com/get-npm`

If you have  not installed Firebase:

Install Firebase tools

sudo npm install -g firebase-tools

Install Firebase

npm install firebase

Run npm start

## Running the tests

To run the automated tests for this system

Navigate to the source folder

cd 3_second_song_challenge

Run npm test

## Break down into tests

We tested each component to ensure that their functionality behaves as expected. We majorly focused on unit testing each feature.

`Example: Clicking the Challenge length button`

    test('Challenge_length button sets length', () => {

    let setChallenge_length = jest.fn();

    const { getByTestId } = render(<Challenge_length challenge_length={5} setChallenge_length={setChallenge_length} gameState=       {null}/>);

    act(() => {
      fireEvent.click(getByTestId("button1"));
    });

    expect(setChallenge_length).toHaveBeenCalledWith(5);
    });
## Deployment
Run firebase serve then deploy
## Built With
REACTJS - The web framework used
## Authors
Oluwatoni Oshikanlu

Perren Wright

Aghogho Biakolo

Mikayla Orange

Prabin Sapkota

## License
This project is licensed under the MIT License
## Acknowledgments

JM Perez for the Spotify API Wrapper

Inspiration from The Beat by Shazam

Google Tech Exchange Team



