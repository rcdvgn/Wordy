import { useRef, useEffect } from 'react';

const Grid = ({ attempts, setAttempts, settingsData, inputRefs }) => {
  const wordSize = settingsData[1].options[settingsData[1].option].wordSize;

  const observedInputRef = useRef(null);

  const handleResize = (entries) => {
    for (const entry of entries) {
      const inputHeight = entry.contentRect.height;

      document.querySelector(':root').style.setProperty('--font-size', `${inputHeight * 0.55}px`);
      document.querySelector(':root').style.setProperty('--border-width', `${inputHeight * 0.08}px`);
    }
  };

  useEffect(() => {
    if (observedInputRef.current) {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(observedInputRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [observedInputRef]);

  const handleChange = (e, rowIndex, cellIndex) => {
    let lastTyped = e.target.value.replace(attempts[rowIndex][cellIndex], '');
    if (/^[A-Za-z]$/.test(lastTyped)) {
      
      let updatedAttempts = [...attempts];
      updatedAttempts[rowIndex][cellIndex] = lastTyped.toUpperCase();

      setAttempts(() => updatedAttempts);

      if (rowIndex < attempts.length && cellIndex < attempts[rowIndex].length - 1) {
        inputRefs.current[rowIndex][cellIndex + 1]?.focus();
      }
    }
  };

  const handleBackspace = (e, rowIndex, cellIndex) => {
    if (e.key === 'Backspace') {
      if (e.target.value !== ''){
        let updatedAttempts = [...attempts];
        updatedAttempts[rowIndex][cellIndex] = '';
        setAttempts(() => updatedAttempts);
      }
      if (cellIndex > 0) {
        inputRefs.current[rowIndex][cellIndex - 1]?.focus();
      }
    }
  }

  const resetInputs = () => {
    for (let i = 0; i < inputRefs.current.length; i++){
      for (let j = 0; j < inputRefs.current[i].length; j++){
        let currentInput = inputRefs.current[i][j];
        currentInput.classList.remove("blue", "yellow");
        if (i === 0){
          currentInput.classList.remove("disabled");
          currentInput.disabled = false;
        }
        else{
          currentInput.classList.add('disabled');
          currentInput.disabled = true;
        }
      }
    }
  }
  
  useEffect(() => {
    !attempts.flat().some(el => el !== '') ? resetInputs() : '';
  }, [attempts]);

  return (
    <div className="grid">
      {attempts.map((row, rowIndex) => {
        return (
          <div className="gridRow" key={rowIndex} ref={observedInputRef}>
            {row.map((cell, cellIndex) => {
              return (
                <input
                  className={`gridCell`}
                  value={attempts[rowIndex][cellIndex]}
                  spellCheck="false"
                  key={rowIndex * wordSize + cellIndex}
                  ref={(input) => {
                    rowIndex === 0 && cellIndex === 0 ? inputRefs.current = [] : '';
                    if (!inputRefs.current[rowIndex]) {
                      inputRefs.current[rowIndex] = [];
                    }
                    inputRefs.current[rowIndex][cellIndex] = input;
                  }}
                  onChange={(e) => handleChange(e, rowIndex, cellIndex)}
                  onKeyUp={(e) => handleBackspace(e, rowIndex, cellIndex)}
                ></input>
              );
            })}
          </div>
          
        );
      })}
    </div>
  );
};

export default Grid;
