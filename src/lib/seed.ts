import Task from '@/models/Task';
import { connectToDatabase } from './db';

const defaultTasks = [
  // 1. Web Development
  {
    title: 'Build a Responsive Landing Page (HTML/Tailwind)',
    description: 'Create a highly polished, fully responsive marketing landing page utilizing semantic HTML5 and Tailwind CSS. The design should feature a premium navigation header, dynamic hero section with bold calls-to-action, a feature bento grid, and a corporate footer.',
    sequenceOrder: 1,
    trackCategory: 'Web Development',
  },
  {
    title: 'Develop a Full-Stack Task Manager (Next.js/React)',
    description: 'Build a production-ready task management dashboard application with Next.js App Router, React client components, and MongoDB. Implement full CRUD capabilities for tasks, status toggle toggles, filtering, search, and loading skeletons.',
    sequenceOrder: 2,
    trackCategory: 'Web Development',
  },
  // 2. Data Science
  {
    title: 'Perform Data Cleaning on a CSV using Pandas',
    description: 'Write a professional Python script using Pandas to clean and preprocess a raw business CSV dataset. Handle missing fields, correct inconsistent data formats, parse datetimes, drop duplicates, and generate a cleaned output file with a structured data summary report.',
    sequenceOrder: 1,
    trackCategory: 'Data Science',
  },
  {
    title: 'Build a Predictive Model using Scikit-Learn',
    description: 'Implement a machine learning workflow in Python using Scikit-Learn to build and train a predictive classification or regression model. Split the dataset, perform feature scaling, train a Random Forest model, evaluate metrics (accuracy, precision, recall), and export the trained model file.',
    sequenceOrder: 2,
    trackCategory: 'Data Science',
  },
  // 3. Artificial Intelligence
  {
    title: 'Integrate an OpenAI/Gemini API via Python',
    description: 'Create a Python backend script or API route to integrate with OpenAI or Google Gemini. Implement advanced system prompting, handle structured JSON outputs, add token usage tracking, and configure error handling with exponential backoff retries.',
    sequenceOrder: 1,
    trackCategory: 'Artificial Intelligence',
  },
  {
    title: 'Build a Custom RAG Document Q&A Application',
    description: 'Develop a custom Retrieval-Augmented Generation (RAG) system. Extract text from uploaded PDF documents, generate chunk embeddings, save them to a vector store, search vector embeddings for context matching, and generate a verified LLM completion response.',
    sequenceOrder: 2,
    trackCategory: 'Artificial Intelligence',
  },
  // 4. Backend Engineering
  {
    title: 'Create a REST API with Node.js & Express',
    description: 'Build a modular RESTful API utilizing Node.js, Express, and Mongoose. Create endpoints for resource handling, integrate custom request validation middleware, establish structured JSON response patterns, and implement global error-handling filters.',
    sequenceOrder: 1,
    trackCategory: 'Backend Engineering',
  },
  {
    title: 'Implement JWT Authentication and MongoDB Aggregation Pipelines',
    description: 'Secure your backend platform using JSON Web Tokens (JWT) for authentication. Create signup, login, and profile protection routes. Implement advanced MongoDB aggregation pipelines to join collections and compute real-time analytical metrics.',
    sequenceOrder: 2,
    trackCategory: 'Backend Engineering',
  },
];

export async function seedDatabase() {
  await connectToDatabase();

  // Try to drop the legacy unique index on sequenceOrder if it exists
  try {
    await Task.collection.dropIndex('sequenceOrder_1');
    console.log('Successfully dropped legacy unique index sequenceOrder_1');
  } catch (err) {
    // Ignore if the index does not exist or collection is not initialized yet
  }
  
  const taskCount = await Task.countDocuments();
  if (taskCount !== 8) {
    console.log('Clearing and re-seeding default tasks for multi-track system...');
    await Task.deleteMany({});
    
    // Create new compound indexes if they aren't registered yet
    try {
      await Task.syncIndexes();
    } catch (indexErr) {
      console.warn('Syncing indexes warning:', indexErr);
    }
    
    await Task.insertMany(defaultTasks);
    console.log('Default tasks seeded successfully.');
  }
}
