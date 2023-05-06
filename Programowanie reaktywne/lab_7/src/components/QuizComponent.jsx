import React, {useState} from 'react'

import questions from '../questions.json'
import Question from "./question";
import Answers from "./answers";
import Actions from "./actions";
import Results from "./results"

/*
    {Comp} is named import and specifies what to import
 */

const styles = {
    display: "flex",
    justifyContent: "center"
}
const QuizComponent = (props) =>{

    const [currentIndex, setIndex] = useState(0)
    const [currentQuestion, setQuestion] = useState(questions[currentIndex])
    const [currentPoints, setPoints] = useState(0)
    const [allowToChoose, changePermission] = useState(true)
    const [markedAnswer, markAnswer] = useState({key: -1, variant: ''})

    const handleNextQuestion = () =>{
        const nextValue = currentIndex + 1

        if (questions.length - 1 < nextValue){
            setIndex(questions.length - 1)
            return
        }
        setIndex(nextValue)
        setQuestion(questions[nextValue])
        changePermission(true)
        markAnswer({key: -1,variant: ''})
    }

    const handlePrevQuestion = () => {
        const prevValue = currentIndex - 1

        if (prevValue < 0){
            setIndex(0)
            return
        }
        setIndex(prevValue)
        setQuestion(questions[prevValue])
        changePermission(true)
        markAnswer({key: -1,variant: ''})
    }

    const handleAnswer = (ans, key) =>{
        if (!allowToChoose){
            return
        }
        if (ans === currentQuestion.correct_answer){
            const points = currentPoints + 1
            setPoints(points)
            changePermission(false)
            markAnswer({key: key, variant: 'bg-success'})
        }
        else{
            changePermission(false)
            markAnswer({key: key, variant: 'bg-danger'})
        }
    }

    return (
        <div style={styles}>
            <div className="container">
                <Question
                    // properties
                    className={"col-12"}
                    currentQuestion={currentQuestion.question}
                    currentIndex={currentIndex + 1}
                    allQuestions={questions.length}
                />
                <Answers
                    className = {"col-12"}
                    checkAnswer={handleAnswer}
                    answers={currentQuestion.answers} // currentQuestion is json object
                    markedAnswer={markedAnswer}
                />
                <Results
                    points={currentPoints}
                />
                <Actions
                    disablePrev={currentIndex === 0}
                    disableNext={currentIndex === questions.length - 1}
                    prev={handlePrevQuestion}
                    next={handleNextQuestion}
                />
            </div>
        </div>
    )
}

export default QuizComponent