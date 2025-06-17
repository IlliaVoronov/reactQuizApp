import { useState } from "react";
import Results from "./results";

function Quiz() {
    const questionBank = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Rome", "Paris"],
            answer: "Paris"
        },
        {
            question: "Which desciple of Jesus was His favourite?",
            options: ["John", "Peter", "Mark"],
            answer: "John"
        },
        {
            question: "What is the name of the best Jedi?",
            options: ["Anakin Skywalker", "Ahsoka Tano", "Obi-Wan Kenobi"],
            answer: "Obi-Wan Kenobi"
        },
        {
            question: "What does JSX stand for?",
            options: [
                "JavaScript XML",
                "Java Syntax eXtension",
                "Just a Simple eXample",
                "None of the above",
            ],
            answer: "JavaScript XML",
        },
    ]

    const initialAnswers = questionBank.map(() => null);
    const [userAnswers, setUserAnswers] = useState(initialAnswers);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);

    const selectedAnswer = userAnswers[currentQuestion];

    function handleSelectOptionoption(option) {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestion] = option;

        setUserAnswers(newUserAnswers);

    }

    function goToNext() {
        if (currentQuestion === questionBank.length - 1) {
            setIsQuizFinished(true);
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    function goToPrev() {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    function restartQuiz() {
        setUserAnswers(initialAnswers);
        setCurrentQuestion(0);
        setIsQuizFinished(false);
    }

    if (isQuizFinished) {
        return <Results userAnswers={userAnswers} questionBank={questionBank} restartQuiz={restartQuiz} />;
    }


    return (
        <div>
            <h2> Question {currentQuestion + 1} </h2>
            <p className="question">{questionBank[currentQuestion].question}</p>
            {questionBank[currentQuestion].options.map((option) => {
                return <button
                    key={option}
                    className={"option" + (selectedAnswer === option ? " selected" : "")} 
                    onClick={() => handleSelectOptionoption(option)}
                >
                    {option}
                </button>
            })}

            <div className="nav-buttons">
                <button onClick={goToPrev} disabled={currentQuestion === 0}> Previous </button>
                <button onClick={goToNext} disabled={!selectedAnswer}>
                    {currentQuestion === questionBank.length -1 ? "Finish Quiz" : "Next"}
                </button>
            </div>

        </div>
    );
}

export default Quiz;