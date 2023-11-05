import { portugueseWords } from './data/portugueseWords.js';
import axios from 'axios';

export const removeAccentuation = (word) => {
  return word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

export const checkAttempt = (event, row, attempts, setRow, answer, setAnswer, inputRefs, handleResults) => {
  let currentAttempt = attempts[row];
  let letterFreq = {};
  let lastRow = attempts[row + 1] ? false : true;
  let currentAttemptLetter;
  let currentAnswerLetter;

  for (let i = 0; i < currentAttempt.length; i++) {
    inputRefs.current[row][i].disabled = true;

    currentAnswerLetter = removeAccentuation(answer[i]);
    currentAttemptLetter = removeAccentuation(currentAttempt[i]);
    
    if (currentAnswerLetter === currentAttemptLetter) {
      inputRefs.current[row][i].classList.add('blue');
    } else {
      if (letterFreq[currentAnswerLetter]) {
        letterFreq[currentAnswerLetter]++;
      } else {
        letterFreq[currentAnswerLetter] = 1;
      }
    }
  }

  let allBlue = Object.keys(letterFreq).length === 0 ? true : false;

  if (allBlue) return handleResults();

  for (let i = 0; i < currentAttempt.length; i++) {
    currentAnswerLetter = removeAccentuation(answer[i]);
    currentAttemptLetter = removeAccentuation(currentAttempt[i]);

    if (!inputRefs.current[row][i].classList.contains('blue')) {
      if (letterFreq[currentAttemptLetter]) {
        letterFreq[currentAttemptLetter]--;
        inputRefs.current[row][i].classList.add('yellow');
      }
    }

    if (!lastRow) {
      inputRefs.current[row + 1][i].disabled = false;
      inputRefs.current[row + 1][i].classList.remove('disabled');
    }
  }
  if (!lastRow) {
    setRow(row + 1);
  } else {
    handleResults();
  }
};

export const calcStars = (wonIndex) => {
  const starColors = [];
  let starsLeft = wonIndex;
  let starColor;
  for (let i = 0; i < 6; i++){
    if (wonIndex){
      if (starsLeft > 1){
        starColor = "rgba(255, 233, 36, 0.4)";
        starsLeft--;
      }
      else{
        starColor = "rgba(255, 233, 36, 1)";
      }
    }
    else{
      starColor = "rgba(255, 233, 36, 0.4)";
    }
    starColors.unshift(starColor);
  }

  return starColors;
}

export const fetchWord = (fetchMethodIndex, settingsData, setAnswer) => {
  if (fetchMethodIndex === 0){
    axios
      .get(`https://random-word-api.herokuapp.com/word?length=${settingsData[1].options[settingsData[1].option].wordSize}`)
      .then((response) => {
        setAnswer(() => (response.data[0].toUpperCase()));
      })
      .catch((error) => {
        console.error('Error fetching word:', error);
      })
    }
    else{
      let ans = portugueseWords[settingsData[1].options[settingsData[1].option].optionTitle]
      [Math.floor(Math.random() * portugueseWords[settingsData[1].options[settingsData[1].option].optionTitle].length)].toUpperCase();
      setAnswer(ans);
    }
};
