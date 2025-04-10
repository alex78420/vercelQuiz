// api/feedback.js
import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
  // 1. Only allow POST requests
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).json({ message: `Method ${request.method} Not Allowed` });
  }

  try {
    // 2. Get data from the request body
    const { rating, comment, elementType, elementIdentifier } = request.body;

    // 3. Basic Validation
    if (!elementType || !elementIdentifier || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return response.status(400).json({ message: 'Données de feedback invalides ou manquantes (elementType, elementIdentifier, rating required).' });
    }
    // Ensure comment is a string or null/undefined
    const safeComment = (typeof comment === 'string' && comment.trim() !== '') ? comment.trim() : null;


    // 4. Connect to Neon database
    // Ensure DATABASE_URL is set in your Vercel environment variables
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL environment variable is not set.");
    }
    const sql = neon(process.env.DATABASE_URL);

    // 5. Insert into the 'feedback' table (use sql.query for placeholders)
    // Make sure the 'feedback' table exists with columns:
    // element_type (VARCHAR), element_identifier (VARCHAR), rating (INTEGER), comment (TEXT)
    await sql.query(
      'INSERT INTO feedback (element_type, element_identifier, rating, comment) VALUES ($1, $2, $3, $4)',
      [elementType, elementIdentifier, rating, safeComment]
    );

    // 6. Send success response
    return response.status(201).json({ message: 'Feedback enregistré avec succès !' });

  } catch (error) {
    console.error('API Feedback Error:', error);
    // Check for specific Neon/DB errors if needed, otherwise send generic error
     if (error instanceof Error && error.message.includes("relation \"feedback\" does not exist")) {
         return response.status(500).json({ message: 'Erreur interne: La table "feedback" n\'existe pas.' });
     }
      if (error instanceof Error && error.message.includes("DATABASE_URL environment variable is not set")) {
         return response.status(500).json({ message: 'Erreur de configuration serveur.' });
     }
    return response.status(500).json({ message: 'Erreur interne du serveur lors de l\'enregistrement du feedback.' });
  }
}