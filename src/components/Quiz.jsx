import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions";
import quizIsCompleteImg from '../assets/quiz-complete.png';
import Question from "./Question";
import Summary from "./Summary";
export default function Quiz()
{
    const shuffledAnswers = useRef;
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex == QUESTIONS.length;
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer)
    {
    setUserAnswers((prevUserAnswers) => {

        return[...prevUserAnswers, selectedAnswer];
    });
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => {handleSelectAnswer(null)}, [handleSelectAnswer]); 
    if(quizIsComplete || activeQuestionIndex >= QUESTIONS.length || activeQuestionIndex < 0){
        return(<Summary userAnswers={userAnswers}></Summary>)
    }
    
    return (
    <div id="quiz">
        <Question key={activeQuestionIndex} index={activeQuestionIndex} onSelectAnswer={handleSelectAnswer} onSkipAnswer={handleSkipAnswer}></Question>
    </div>); 
}