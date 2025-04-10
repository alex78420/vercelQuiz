// src/App.jsx
import React, { useState, useEffect } from 'react';
import { quizQuestions, formations } from './quizData'; // Adjust path if needed
import FeedbackForm from './FeedbackForm'; // Adjust path if needed
import './App.css'; // Your main CSS file

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState({ loading: false, error: null, success: null });
  const [sortedResults, setSortedResults] = useState([]); // Store sorted results here

  useEffect(() => {
    const initialScores = {};
    for (const key in formations) {
      initialScores[key] = 0;
    }
    setScores(initialScores);
  }, []);

  // --- Logic to calculate and sort results ---
  const calculateResults = () => {
    // 1. Convert scores object to array: [ { name: 'BTS', score: 3 }, ... ]
    const resultsArray = Object.entries(scores).map(([name, score]) => ({ name, score }));

    // 2. Sort the array by score descending
    resultsArray.sort((a, b) => b.score - a.score);

    setSortedResults(resultsArray);
    setQuizCompleted(true);
    setFeedbackStatus({ loading: false, error: null, success: null }); // Reset feedback status for results page
    console.log("Quiz Completed! Final Sorted Results:", resultsArray);
  };


  // --- Handlers ---

  const handleAnswerSelect = (answerIndex) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const scoringRules = currentQuestion.scoring[answerIndex];

    setScores(prevScores => {
      const newScores = { ...prevScores };
      for (const formationKey in scoringRules) {
        if (newScores.hasOwnProperty(formationKey)) {
          newScores[formationKey] += scoringRules[formationKey];
        } else {
          console.warn(`Formation key "${formationKey}" in scoring not found in formations data.`);
        }
      }
      return newScores;
    });
    setShowFeedback(true);
  };

  const proceedToNextStep = () => {
     setShowFeedback(false);
     setFeedbackStatus({ loading: false, error: null, success: null }); // Reset feedback status

     const nextIndex = currentQuestionIndex + 1;
     if (nextIndex < quizQuestions.length) {
       setCurrentQuestionIndex(nextIndex);
     } else {
       // End of Quiz - Calculate results now
       calculateResults();
     }
  }

  const submitFeedbackAndProceed = async (feedbackData) => {
    console.log("Submitting feedback:", feedbackData);
    setFeedbackStatus({ loading: true, error: null, success: null });

    try {
      const response = await fetch('/api/feedback', { // Use the same API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Erreur lors de l\'envoi.');

      setFeedbackStatus({ loading: false, error: null, success: 'Avis envoyé avec succès !' });

      // If feedback was for a question, proceed. If for results, just show success.
      if (feedbackData.elementType === 'question') {
        setTimeout(proceedToNextStep, 500);
      } else {
          // Keep results visible, just show success message
          setTimeout(() => setFeedbackStatus({ loading: false, error: null, success: null }), 3000); // Clear success message after 3s
      }

    } catch (error) {
      console.error("Feedback submission error:", error);
      const errorMsg = `Erreur: ${error.message}`;
      setFeedbackStatus({ loading: false, error: errorMsg, success: null });
      // If it was question feedback, proceed anyway after showing error briefly
      if (feedbackData.elementType === 'question') {
           setTimeout(proceedToNextStep, 1500);
      } else {
          // Keep results visible, clear error after a while
          setTimeout(() => setFeedbackStatus({ loading: false, error: null, success: null }), 5000);
      }
    }
  };

  // Skip answer and feedback for the question
  const skipQuestionAndFeedback = () => {
    console.log("Skipping question and feedback for:", currentQuestionIndex);
    proceedToNextStep(); // Directly go to next step (next question or results)
  }


  // --- Render Logic ---

  // ===== RESULTS DISPLAY =====
  if (quizCompleted) {
    const topScore = sortedResults.length > 0 ? sortedResults[0].score : 0;

    return (
      <div className="quiz-container results-page">
        <h1>Résultats du Quiz</h1>
        <p className="results-disclaimer">
            <strong>Attention :</strong> Ce quiz est une simple indication basée sur vos réponses.
            Il ne remplace pas une recherche approfondie ! Renseignez-vous bien sur chaque formation,
            participez aux journées portes ouvertes et discutez-en avec vos professeurs ou un conseiller d'orientation.
        </p>

        {/* Message if scores are low/inconclusive */}
        {topScore <= 0 && sortedResults.length > 0 && (
             <p className="results-warning">
                Vos réponses ne semblent pas correspondre clairement à un type de formation spécifique parmi celles proposées.
                N'hésitez pas à refaire le quiz ou à explorer plus largement les différentes options d'études.
             </p>
        )}

        <h2>Votre classement indicatif :</h2>
        <ol className="results-list">
            {sortedResults.map((result, index) => (
                 // Optional: Only show top 3-5 or those with positive scores?
                 // if (index < 3 || result.score > 0) { ... }
                 <li key={result.name} className="result-item">
                     <div className="result-header">
                         <span className="result-rank">#{index + 1}</span>
                         <span className="result-name">{result.name}</span>
                         <span className="result-score">(Score indicatif : {result.score})</span>
                     </div>
                     <p className="result-description">{formations[result.name]?.description || 'Description non disponible.'}</p>
                 </li>
            ))}
        </ol>

        <hr className="results-divider" />

        {/* --- Feedback form for overall results --- */}
         {feedbackStatus.error && <p className="feedback-error">{feedbackStatus.error}</p>}
         {feedbackStatus.success && <p className="feedback-success">{feedbackStatus.success}</p>}
         {!feedbackStatus.success && ( // Hide form after successful submission maybe?
             <FeedbackForm
               elementType="results"
               elementIdentifier="final_results"
               onSubmitFeedback={submitFeedbackAndProceed} // Reuse same function
               onSkipFeedback={() => {}} // No skip for results feedback needed
               isSubmitting={feedbackStatus.loading}
               // No question context needed here
             />
         )}
         {feedbackStatus.success && (
            <p className="feedback-thanks">Merci pour votre avis sur les résultats !</p>
         )}


         <style jsx>{`
            .results-page h1 { margin-bottom: 15px; }
            .results-disclaimer, .results-warning {
                background-color: #fff3cd;
                border: 1px solid #ffeeba;
                color: #856404;
                padding: 15px;
                border-radius: 4px;
                margin-bottom: 25px;
                font-size: 0.95em;
            }
            .results-warning { background-color: #f8d7da; border-color: #f5c6cb; color: #721c24; }
            .results-page h2 { margin-bottom: 15px; }
            .results-list { list-style: none; padding: 0; margin: 0; }
            .result-item {
                border: 1px solid #eee;
                border-radius: 8px;
                margin-bottom: 15px;
                padding: 15px 20px;
                background-color: #fff;
                 box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }
            .result-header {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 10px;
                flex-wrap: wrap;
            }
            .result-rank {
                font-weight: bold;
                font-size: 1.2em;
                color: #007bff;
                min-width: 30px; /* Ensure space */
            }
            .result-name {
                font-weight: bold;
                font-size: 1.15em;
                color: #333;
                flex-grow: 1; /* Take available space */
            }
            .result-score {
                font-size: 0.9em;
                color: #666;
                background-color: #f0f0f0;
                padding: 3px 8px;
                border-radius: 4px;
                white-space: nowrap;
            }
            .result-description {
                font-size: 1em;
                color: #555;
                line-height: 1.5;
                margin: 0;
            }
            .results-divider {
                margin: 30px 0;
                border: none;
                border-top: 1px solid #eee;
            }
             .feedback-error, .feedback-success { margin-top: 20px; text-align: center; font-weight: bold; }
             .feedback-thanks { margin-top: 20px; text-align: center; color: green; font-weight: bold;}
         `}</style>
      </div>
    );
  }


  // ===== QUESTION DISPLAY =====
  if (quizQuestions.length === 0 || Object.keys(scores).length === 0) {
    return <div className="loading">Chargement du quiz...</div>;
  }
  if (currentQuestionIndex >= quizQuestions.length) {
     return <div className="error">Erreur : Impossible de charger la question.</div>;
  }
  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>Quiz d'Orientation</h2>
      <div className="question-card">
        <p className="question-number">Question {currentQuestionIndex + 1} / {quizQuestions.length}</p>
        <h2>{currentQuestion.text}</h2>

        {!showFeedback ? (
          <div className="answer-options">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                className="answer-button"
                onClick={() => handleAnswerSelect(index)}
              >
                {answer}
              </button>
            ))}
             <button
                className="answer-button skip-question"
                onClick={skipQuestionAndFeedback} // Use the specific skip function
             >
                 Je ne sais pas / Passer cette question
             </button>
          </div>
        ) : (
          <>
            {feedbackStatus.error && <p className="feedback-error">{feedbackStatus.error}</p>}
            {feedbackStatus.success && <p className="feedback-success">{feedbackStatus.success}</p>}
            <FeedbackForm
              elementType="question"
              elementIdentifier={`question_${currentQuestionIndex}`}
              onSubmitFeedback={submitFeedbackAndProceed}
              onSkipFeedback={skipQuestionAndFeedback} // Use the skip function here too
              isSubmitting={feedbackStatus.loading}
              // Pass context to feedback form
              questionText={currentQuestion.text}
              questionAnswers={currentQuestion.answers}
            />
          </>
        )}
      </div>

       {/* Global styles remain the same */}
       <style jsx global>{`
            /* ... (keep the global styles from the previous answer) ... */
            body { font-family: sans-serif; margin: 20px; background-color: #f0f4f8; }
            .quiz-container { max-width: 700px; margin: auto; background-color: #fff; padding: 20px 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { text-align: center; color: #333; margin-bottom: 30px; }
            .question-card { margin-bottom: 20px; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #fff;}
            .question-number { font-size: 0.9em; color: #666; margin-bottom: 5px; }
            h2 { margin-top: 0; margin-bottom: 25px; font-size: 1.4em; line-height: 1.4; color: #444;}
            .answer-options { display: flex; flex-direction: column; gap: 15px; }
            .answer-button {
                display: block;
                width: 100%;
                padding: 15px;
                font-size: 1.1em;
                text-align: left;
                background-color: #e7f1ff;
                border: 1px solid #b8d4ff;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.2s ease, border-color 0.2s ease;
            }
            .answer-button:hover {
                background-color: #d0e3ff;
                border-color: #a1c6ff;
            }
            .answer-button.skip-question {
                 background-color: #f8f9fa;
                 border-color: #dee2e6;
                 color: #495057;
                 margin-top: 10px;
            }
             .answer-button.skip-question:hover {
                 background-color: #e9ecef;
                 border-color: #ced4da;
            }
            .feedback-error { color: red; margin-bottom: 10px; font-weight: bold; text-align: center; }
            .feedback-success { color: green; margin-bottom: 10px; font-weight: bold; text-align: center; }
            .loading, .error { text-align: center; padding: 40px; font-size: 1.2em; color: #555; }
       `}</style>
    </div>
  );
}

export default App;