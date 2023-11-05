import './assets/styles/App.css';
import { useState, useEffect, useRef } from 'react';
import Grid from './components/Grid.jsx';
import { SettingsIcon, Logo } from './components/Icons.jsx';
import Settings from './components/Settings.jsx';
import Results from './components/Results.jsx';
import { checkAttempt, fetchWord } from './utils.js';

function App() {
  const [settingsData, setSettingsData] = useState(
    [
      {settingTitle: "LANGUAGE", options: [
        {optionTitle: "English", code:"us"}, 
        {optionTitle: "Portuguese", code:"br"},
        ], option: 0, tempOption: 0
      },
      {settingTitle: "DIFFICULTY", options: [
        {optionTitle: "Easy", wordSize: 4, color: '#51FE81'}, 
        {optionTitle: "Medium", wordSize: 5, color: '#FE9051'}, 
        {optionTitle: "Hard", wordSize: 6, color: '#FE5151'}, 
        {optionTitle: "Impossible", wordSize: 7, color: '#8851FE'}
        ], option: 1, tempOption: 1
      }
    ]
  );

  const inputRefs = useRef([]);
  const isInitialRender = useRef(true);

  const [showSettings, setShowSettings] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [row, setRow] = useState(0);
  const [attempts, setAttempts] = useState(
    Array(6)
      .fill(null)
      .map(() => Array(settingsData[1].options[settingsData[1].option].wordSize).fill(''))
  );
  const [answer, setAnswer] = useState('');

  const handleSettings = () => {
    setShowSettings(true);
  }

  const handleResults = () => {
    setShowResults(true);
  };

  const nextGame = () => {
    setAttempts(
      Array(6)
      .fill(null)
      .map(() => Array(settingsData[1].options[settingsData[1].option].wordSize).fill(''))
    );
    setRow(0);
    fetchWord(settingsData[0].option, settingsData, setAnswer);
  }

  useEffect(() => {
    inputRefs.current[row][0].focus();

    const enterAttempt = (event) => {
      let isRowComplete = !attempts[row].some(el => el === '');

      if (event.key === 'Enter' && isRowComplete) {
        !showSettings && !showResults ? checkAttempt(event, row, attempts, setRow, answer, setAnswer, inputRefs, handleResults) : '';
      }
    }

    window.addEventListener('keydown', enterAttempt);

    return () => {
      window.removeEventListener('keydown', enterAttempt);
    };
  }, [row, settingsData, answer, showResults, showSettings]);

  useEffect(() => {
    if(isInitialRender.current){
      fetchWord(settingsData[0].option, settingsData, setAnswer);
      isInitialRender.current = false;
    }   
  }, []);


  return (
    <>
      <div className="header">
        <Logo className="logo" />
        <div className="settingsButton" onClick={handleSettings}>
          <SettingsIcon className='settingsIcon' />
        </div>
      </div>

      <div className="content">
        <Grid
          attempts={attempts}
          setAttempts={setAttempts}
          settingsData={settingsData}
          inputRefs={inputRefs}
        />
      </div>

      <div className="footer">&copy; {new Date().getFullYear()} Ricardo Vigliano. All rights reserved.</div>

      {showResults && 
        <Results 
          attempts={attempts} 
          answer={answer} 
          diff={settingsData[1].option} 
          diffs={settingsData[1].options} 
          setShowResults={setShowResults} 
          nextGame={nextGame} 
        />
      }
      {showSettings && 
        <Settings 
          settingsData={settingsData} 
          setSettingsData={setSettingsData} 
          setShowSettings={setShowSettings} 
          nextGame={nextGame} 
          inputRefs={inputRefs} 
        />
      }
    </>
  );
}

export default App;
