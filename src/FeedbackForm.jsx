// src/components/FeedbackForm.jsx
import React, { useState } from 'react';

// Receive questionText and questionAnswers as props
function FeedbackForm({
  elementType,
  elementIdentifier,
  onSubmitFeedback,
  onSkipFeedback,
  isSubmitting,
  questionText, // <-- New prop
  questionAnswers // <-- New prop
}) {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rating === null && elementType === 'question') { // Rating mandatory only for questions for now
        alert("Veuillez sélectionner une note (1 à 5) avant de soumettre.");
        return;
    }
    onSubmitFeedback({
      rating: rating || 0, // Send 0 if skipped/no rating for results feedback maybe? Or handle null in API
      comment,
      elementType,
      elementIdentifier
    });
  };

  const handleSkip = () => {
    onSkipFeedback();
  }

  return (
    <div className="feedback-form">
      {/* --- Display Question Context (only if elementType is 'question') --- */}
      {elementType === 'question' && questionText && questionAnswers && (
        <div className="feedback-context">
          <p><strong>Options proposées :</strong></p>
          <ul>
            {questionAnswers.map((ans, idx) => <li key={idx}>{ans}</li>)}
          </ul>
        </div>
      )}
      {/* --- End Context --- */}

      <h4>Votre avis sur {elementType === 'question' ? 'cette question' : 'les résultats'} :</h4>
      <p className="feedback-instruction">
          Notez la pertinence {elementType === 'question' ? 'de la question et de ses choix' : 'des résultats proposés'} (1 = Pas du tout pertinent, 5 = Très pertinent) :
      </p>

      <div className="rating-buttons">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            className={`rating-button ${rating === value ? 'selected' : ''}`}
            onClick={() => handleRatingClick(value)}
            disabled={isSubmitting}
            aria-pressed={rating === value}
            aria-label={`Noter ${value} sur 5`}
          >
            {value}
          </button>
        ))}
      </div>

      <textarea
        placeholder="Ajouter un commentaire (optionnel)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="3"
        disabled={isSubmitting}
      />

      <div className="feedback-actions">
          <button
            type="button"
            onClick={handleSubmit}
            // Allow submitting results feedback without rating for now
            disabled={isSubmitting || (rating === null && elementType === 'question')}
           >
            {isSubmitting ? 'Envoi...' : 'Envoyer l\'avis'}
          </button>
          {/* Only show Skip button for questions? */}
          {elementType === 'question' && (
              <button
                type="button"
                onClick={handleSkip}
                className="skip-button"
                disabled={isSubmitting}
               >
                {isSubmitting ? '...' : 'Passer sans noter'}
              </button>
          )}
           {/* For results, maybe just a "Close" button or nothing? */}
      </div>
       <style jsx>{`
        .feedback-form {
          border: 1px solid #ccc;
          padding: 15px;
          margin-top: 20px;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        .feedback-context {
          background-color: #eee;
          border: 1px dashed #ccc;
          padding: 10px 15px;
          margin-bottom: 15px;
          border-radius: 4px;
          font-size: 0.95em;
        }
        .feedback-context p {
            margin: 5px 0;
        }
        .feedback-context ul {
            margin: 5px 0 5px 20px;
            padding: 0;
        }
        .feedback-context li {
            margin-bottom: 3px;
        }

        .feedback-form h4 {
            margin-top: 0;
            margin-bottom: 5px;
            font-size: 1.1em;
        }
        .feedback-instruction {
            font-size: 0.9em;
            color: #555;
            margin-bottom: 10px;
        }
        .rating-buttons {
          margin-bottom: 15px;
          display: flex;
          gap: 10px;
        }
        .rating-button {
          padding: 8px 12px;
          font-size: 1em;
          cursor: pointer;
          border: 1px solid #ccc;
          background-color: white;
          border-radius: 4px;
          min-width: 40px;
          text-align: center;
          transition: background-color 0.1s ease, border-color 0.1s ease;
        }
        .rating-button.selected {
          background-color: #007bff;
          color: white;
          border-color: #007bff;
          font-weight: bold;
        }
         .rating-button:hover:not(.selected):not(:disabled) {
             border-color: #999;
         }
        .rating-button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
        textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          font-size: 1em;
          font-family: inherit;
        }
        textarea:disabled {
            background-color: #eee;
            cursor: not-allowed;
        }
        .feedback-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap; /* Allow wrapping on small screens */
            gap: 10px;
        }
        .feedback-actions button {
            padding: 10px 15px;
            font-size: 1em;
            cursor: pointer;
            border-radius: 5px;
            border: none;
        }
         .feedback-actions button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
        .feedback-actions button[type="button"]:first-of-type {
            background-color: #28a745;
            color: white;
        }
         .feedback-actions button[type="button"]:first-of-type:disabled:not([disabled=""]) {
            background-color: #8fcca0;
        }
        .skip-button {
            background-color: #6c757d;
            color: white;
        }
        .skip-button:hover:not(:disabled) {
            background-color: #5a6268;
        }
      `}</style>
    </div>
  );
}

export default FeedbackForm;