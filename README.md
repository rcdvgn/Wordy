<img src="https://github.com/rcdvgn/Wordy/blob/main/src/assets/favicon/favicon.png?raw=true" alt="Wordy Logo" width= "80" />

# Wordy

Check it out! [Live demo](https://wordy-tawny.vercel.app/)

## About

**Wordy** is an improved, multilingual, multi-difficulty, React clone of the famous [Wordle](https://www.nytimes.com/games/wordle/index.html) game, where you attempt to guess the mystery word in the fewest number of attempts!

The project took me around 1 week to design/build, and it was made using React with JavaScript.

Some awesome front-end concepts are covered, such as:
- Function components.

- State management.

- DOM manipulation.

- Side effects.

- Layout responsiveness across different screen sizes.

- API integration and more!

### API

The application gets its words from a [free random words API](http://random-word-api.herokuapp.com/home) for the English game mode. I knew from the start I wanted the game to have 2 available languages to play with, but unfortunately due to the API's limitation, only one parameter can be passed at once. Since word length is the most fundamental aspect of the request, it was the winner parameter. 

It would be possible to request the word by language and simply discard and try again if the returned word wasn't the correct length, but this would result in a significant performance decrease so I opted to go with a different alternative. Since I had made a simpler vanilla JavaScript version of the game a couple of months prior using a small/medium Portuguese words database I decided to simply incorporate that as the source for the Portuguese version of the game.

### Game Modes

The application's game modes are very straight forward and work as follows:

| Easy | Medium (default) | Hard | Impossible |
| -------- | -------- | -------- | -------- |
| 4 letter words | 5 letter words | 6 letter words | 7 letter words |

As for the number of attempts, it remains the same (6) throughout all 4 game difficulties.

## Features

- Modern and intuitive user interface.

- Thousands of words to play with.

- Unlimited amount of games: play as many times as you feel like! 

- 4 game modes of increasing difficulty to choose from.

- Available in English and Brazilian Portuguese.

## Limitations

- No data persistence between sessions: refreshing or closing the page will cause you to lose your current progress.

- Input word validation: the application does not check whether the inputted word is a valid word in the current language's dictionary.

- Non functional `Share` button serving only as a visual aid.

- No integrated keyboard component (to come in future versions).

Enjoy! 😊
