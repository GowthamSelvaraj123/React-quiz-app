import quizIsCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from "../questions";

export default function Summary({ userAnswers }) {
    // Filter answers for skipped and correct answers
    const skippedAnswers = userAnswers.filter(answer => answer === null);
    const correctAnswers = userAnswers.filter((answer, index) => QUESTIONS[index] && answer === QUESTIONS[index].answers[0]);

    // Calculate shares
    const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

    return (
        <div id="summary">
            <img src={quizIsCompleteImg} alt="Trophy Icon" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p><span className="number">{skippedAnswersShare}% </span>
                <span className="text">skipped</span></p>
                <p><span className="number">{correctAnswersShare}% </span>
                <span className="text">answered correctly</span></p>
                <p><span className="number">{wrongAnswersShare}% </span>
                <span className="text">answered incorrectly</span></p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    const question = QUESTIONS[index];

                    // Skip rendering if the question does not exist
                    if (!question) {
                        console.warn(`Question not found at index ${index}`); // Optional: log for debugging
                        return null; // Skip rendering this item
                    }

                    // Determine the CSS class based on the answer status
                    let cssClass = 'user-answer';
                    if (answer === null) {
                        cssClass += ' skipped';
                    } else if (answer === question.answers[0]) {
                        cssClass += ' correct';
                    } else {
                        cssClass += ' wrong';
                    }

                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className="question">{question.text}</p>
                            <p className={cssClass}>{answer !== null ? answer : 'Skipped'}</p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
