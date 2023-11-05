import { StarIcon, FlameIcon, ShareIcon } from "./Icons";
import { removeAccentuation, calcStars } from '../utils.js';

export default function Results({ attempts, answer, diff, diffs, setShowResults, nextGame }) {
    const lastIndex = attempts.findIndex(attempt => removeAccentuation(attempt.join('')) === removeAccentuation(answer));
    const wonIndex = lastIndex + 1;

    const starColors = calcStars(wonIndex);

    const handlePlayAgain = () => {
        setShowResults(false);
        nextGame();
    }

    const handleResultMessage = wonIndex ? 
        <>
            It took you{' '}
            <span className="attemptsNum">
                {wonIndex}
            </span>{' '}
            attempt{wonIndex > 1 ? 's' : ''} to <br />correctly guess the word:
        </>
        :
        <>It took you 6 tries and you still <br />managed to get them all wrong</>

    const notAvailable = () => {
        alert("Nothing to see here, better luck in the next version...");
    }

    return (
        <div className="blackBackground">
            <div className="boxWrapper">
                <div className="resultsDiff" style={{backgroundColor: `${diffs[diff].color}`}}>
                    <FlameIcon className="resultsFlameIcon" color={"white"} />
                    <span>{diffs[diff].optionTitle}</span>
                </div>
                <span className="boxTitle resultsBoxTitle">{wonIndex ? "Congratulations!" : 'Not this time!'}</span>
                <div className="starWrapper">
                    {starColors.map((color, index) => (
                        <StarIcon key={index} className="starIcon" color={color} />
                    ))}
                </div>
                <div className="resultsMessage">{handleResultMessage}</div>
                <span className="resultsAnswer">{answer}</span>
                <div className="boxButtons">
                    <button onClick={notAvailable} className="btn btn-2"><ShareIcon className="shareIcon" />Share</button>
                    <button onClick={handlePlayAgain} className="btn btn-1">Play Again</button>
                </div>
            </div>
        </div>
    );
}