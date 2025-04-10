// api/submit-comment.js
import { neon } from '@neondatabase/serverless';
console.log(process.env.DATABASE_URL) // For debugging, remove in production 
// This is the main function Vercel will run
export default async function handler(request, response) {
  // 1. Only allow POST requests (good practice)
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).json({ message: `Method ${request.method} Not Allowed` });
  }

  try {
    // 2. Get the comment from the request body
    // Vercel automatically parses the JSON body if the Content-Type header is correct
    const { comment } = request.body;

    // 3. Basic Validation (ensure comment exists and is a string)
    if (!comment || typeof comment !== 'string' || comment.trim() === '') {
      return response.status(400).json({ message: 'Comment is required and cannot be empty.' });
    }

    // 4. Connect to Neon using the DATABASE_URL environment variable
    // process.env.DATABASE_URL is automatically available in Vercel Functions
    // when the Neon integration is set up or the variable is added manually.
    console.log(process.env.DATABASE_URL); // For debugging, remove in production 
    const sql = neon(process.env.DATABASE_URL);


    // 5. Insert the comment into the database (using parameterized query for security)
    await sql.query('INSERT INTO comments (comment) VALUES ($1)', [comment.trim()]); // <--- Changed 

    // 6. Send a success response back to the frontend
    return response.status(201).json({ message: 'Comment submitted successfully!' });

  } catch (error) {
    console.error('API Error:', error);
    // 7. Send an error response if anything goes wrong
    return response.status(500).json({ message: 'Failed to submit comment.' });
  }
}