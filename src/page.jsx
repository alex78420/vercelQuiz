// app/page.tsx
'use client'; // Add this at the top! Important for using hooks like useState

import { useState } from 'react';
import { formations, quizQuestions } from './quizData'; // Adjust path if needed
// Remove the neon import for now, we'll add it back later for feedback

// Define a type for scores (good practice in TypeScript)
type Scores = {
  [key: string]: number;
};

export default function Page() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Scores>(() => {
    // Initialize scores to 0 for all formations
    const initialScores: Scores = {};
    Object.keys(formations).forEach(key => {
      initialScores[key] = 0;
    });
    return initialScores;
  });
  const [quizFinished, setQuizFinished] = useState(false);

  // --- Handlers (will add later) ---
  const handleAnswer = (answerIndex: number) => {
    // Logic to update scores based on quizQuestions[currentQuestionIndex].scoring[answerIndex]
    // Logic to move to the next question or finish the quiz
    // We will fill this in next
    console.log(`Answered question ${currentQuestionIndex} with option ${answerIndex + 1}`);

    // Placeholder: Just move to next question for now
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setQuizFinished(true); // Mark quiz as finished
    }
  };

  // --- Rendering Logic ---
  if (quizFinished) {
    // Show results (we'll build this part too)
    return (
      <div>
        <h2>Quiz Terminé !</h2>
        <p>Voici vos résultats (simplifié pour l'instant) :</p>
        {/* Add logic here to sort and display scores */}
        <pre>{JSON.stringify(scores, null, 2)}</pre>
        {/* Later: Add feedback form for results */}
      </div>
    );
  }

  // If quiz is not finished, show the current question
  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}/{quizQuestions.length}</h2>
      <p>{currentQuestion.text}</p>
      <div>
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            style={{ display: 'block', margin: '5px 0' }} // Basic styling
          >
            {answer}
          </button>
        ))}
      </div>
      {/* Later: Add feedback form for the question */}
    </div>
  );
}

// Remove the Server Action 'create' for now. We will rebuild it for feedback.