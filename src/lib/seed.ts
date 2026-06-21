import Task from '@/models/Task';
import { connectToDatabase } from './db';

const defaultTasks = [
  // 1. Web Development
  {
    title: 'Build a Responsive Corporate Landing Page',
    description: 'Construct a highly polished, fully responsive corporate marketing landing page utilizing semantic HTML5 and Tailwind CSS. The design must feature a custom header navigation, a modern hero section, and responsive components.',
    sequenceOrder: 1,
    trackCategory: 'Web Development',
    quizQuestions: [
      {
        question: 'Which Tailwind class is used to set a display flex with a row-reverse direction?',
        options: ['flex-row-reverse', 'flex-row-rev', 'flex-reverse', 'row-reverse'],
        correctAnswerIndex: 0
      },
      {
        question: 'How do you configure a custom color named "brand-blue" in Tailwind CSS v4 config theme?',
        options: [
          'theme { --color-brand-blue: #0000ff; }',
          '@config { brand-blue: #0000ff; }',
          'theme: { extend: { colors: { "brand-blue": "#0000ff" } } }',
          'tailwind.config = { colors: { "brand-blue": "#0000ff" } }'
        ],
        correctAnswerIndex: 0
      },
      {
        question: 'What is the primary purpose of semantic HTML elements?',
        options: [
          'To speed up browser rendering times',
          'To provide meaning about the content to search engines and screen readers',
          'To apply default styling to the text layout',
          'To prevent CSS layout bugs'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    title: 'Develop a Full-Stack Serverless Task Workspace',
    description: 'Develop a serverless workspace application using Next.js, React Client Components, and MongoDB. Implement full CRUD capabilities, state management, and real-time dashboard state synchronization.',
    sequenceOrder: 2,
    trackCategory: 'Web Development',
    quizQuestions: [
      {
        question: 'In Next.js App Router, how do you mark a file to execute on the client side rather than server side?',
        options: ['"use server"', '"use client"', '"client"', 'export const runtime = "client"'],
        correctAnswerIndex: 1
      },
      {
        question: 'Which React hook should be used to memoize the result of an expensive calculation?',
        options: ['useCallback', 'useMemo', 'useRef', 'useEffect'],
        correctAnswerIndex: 1
      },
      {
        question: 'How do you define a dynamic route segment in Next.js App Router?',
        options: ['[id].tsx', '[id]/page.tsx', ':id/page.tsx', 'id/page.tsx'],
        correctAnswerIndex: 1
      }
    ]
  },
  // 2. Data Science
  {
    title: 'Clean and Process High-Dimensional CSV Datasets',
    description: 'Write a professional python script using Pandas and NumPy to clean high-dimensional datasets, handle missing inputs, normalize records, and produce detailed analytical summaries.',
    sequenceOrder: 1,
    trackCategory: 'Data Science',
    quizQuestions: [
      {
        question: 'Which Pandas method is used to drop rows containing missing values?',
        options: ['drop_null()', 'dropna()', 'clear_na()', 'remove_na()'],
        correctAnswerIndex: 1
      },
      {
        question: 'In NumPy, how do you find the mean value of an array?',
        options: ['np.mean()', 'np.avg()', 'np.median()', 'np.sum()'],
        correctAnswerIndex: 0
      },
      {
        question: 'Which Pandas function is used to convert a column to a datetime object?',
        options: ['to_date()', 'to_datetime()', 'as_datetime()', 'parse_date()'],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    title: 'Build and Deploy an Explanatory Predictive Regression Model',
    description: 'Implement a predictive machine learning workflow using Scikit-Learn. Perform scaling, split datasets, configure features, evaluate regression metrics, and deploy the prediction pipeline.',
    sequenceOrder: 2,
    trackCategory: 'Data Science',
    quizQuestions: [
      {
        question: 'Which class in Scikit-Learn is used to train a linear regression model?',
        options: ['LinearRegression', 'LogisticRegression', 'RandomForestRegressor', 'SVM'],
        correctAnswerIndex: 0
      },
      {
        question: 'What metric is commonly used to evaluate a regression model\'s predictive performance?',
        options: ['Accuracy', 'F1-Score', 'Mean Squared Error (MSE)', 'Recall'],
        correctAnswerIndex: 2
      },
      {
        question: 'What is the purpose of train_test_split in scikit-learn?',
        options: [
          'To normalize features',
          'To train the model',
          'To split data into training and validation sets',
          'To evaluate performance metrics'
        ],
        correctAnswerIndex: 2
      }
    ]
  },
  // 3. Artificial Intelligence
  {
    title: 'Integrate LLM API Endpoints with Rate-Limit Management',
    description: 'Integrate deep learning language model APIs (Python/Gemini API). Implement rate-limiting, system prompts, error fallback mechanisms, and token expenditure monitoring.',
    sequenceOrder: 1,
    trackCategory: 'Artificial Intelligence',
    quizQuestions: [
      {
        question: 'How do you handle HTTP 429 (Too Many Requests) errors when integrating LLM APIs?',
        options: ['Terminate execution', 'Retry immediately', 'Implement exponential backoff', 'Send requests in parallel'],
        correctAnswerIndex: 2
      },
      {
        question: 'What is the purpose of a system prompt in an LLM call?',
        options: [
          'To define safety thresholds',
          'To configure user queries',
          'To set behavioral guidelines and context for the model',
          'To speed up response generation'
        ],
        correctAnswerIndex: 2
      },
      {
        question: 'Which temperature setting makes LLM outputs more deterministic and less creative?',
        options: ['1.0', '0.7', '0.2', '1.5'],
        correctAnswerIndex: 2
      }
    ]
  },
  {
    title: 'Architect a Custom Retrieval-Augmented Generation Document Q&A App',
    description: 'Develop a custom Retrieval-Augmented Generation (RAG) system. Parse PDF texts, configure vector embeddings stores, and output contextual answers verified against document databases.',
    sequenceOrder: 2,
    trackCategory: 'Artificial Intelligence',
    quizQuestions: [
      {
        question: 'What does RAG stand for?',
        options: ['Random Augmented Generation', 'Retrieval-Augmented Generation', 'Recurrent Architecture Graph', 'Realtime Access Gateway'],
        correctAnswerIndex: 1
      },
      {
        question: 'Why do we chunk documents before generating vector embeddings?',
        options: [
          'To reduce API call cost',
          'To fit context length limitations and preserve local search relevance',
          'To make text reading faster',
          'To encrypt document contents'
        ],
        correctAnswerIndex: 1
      },
      {
        question: 'Which mathematical function is commonly used to calculate similarity between vector embeddings?',
        options: ['Cosine Similarity', 'Euclidean Distance', 'Pearson Correlation', 'Manhattan Distance'],
        correctAnswerIndex: 0
      }
    ]
  },
  // 4. Backend Engineering
  {
    title: 'Develop a Highly Secure REST API with Express and JWT Auth',
    description: 'Develop a secure REST API with Node.js and Express. Integrate custom JSON Web Token (JWT) session authorization, validate payload structures, and protect secure endpoints.',
    sequenceOrder: 1,
    trackCategory: 'Backend Engineering',
    quizQuestions: [
      {
        question: 'Where should JWTs be stored on the client side for maximum security against XSS attacks?',
        options: ['LocalStorage', 'SessionStorage', 'HttpOnly Secure Cookies', 'Redux State'],
        correctAnswerIndex: 2
      },
      {
        question: 'What is the purpose of app.use(express.json()) in an Express application?',
        options: ['To compress responses', 'To parse incoming JSON request bodies', 'To encrypt routes', 'To log database queries'],
        correctAnswerIndex: 1
      },
      {
        question: 'Which middleware function is used to verify JWT tokens in Express?',
        options: ['jwt.sign', 'jwt.verify', 'jwt.decode', 'jwt.encrypt'],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    title: 'Implement Real-time Event Subscriptions & DB Aggregation Pipelines',
    description: 'Implement real-time server push events, configure event subscriptions queues, and model complex MongoDB aggregate analytics pipelines for fast retrieval.',
    sequenceOrder: 2,
    trackCategory: 'Backend Engineering',
    quizQuestions: [
      {
        question: 'Which MongoDB operator is used in aggregation pipelines to join documents from another collection?',
        options: ['$match', '$project', '$lookup', '$group'],
        correctAnswerIndex: 2
      },
      {
        question: 'What protocol is commonly used to implement real-time server push events?',
        options: ['HTTP POST', 'WebSockets', 'DNS Lookup', 'SMTP'],
        correctAnswerIndex: 1
      },
      {
        question: 'In a MongoDB aggregation pipeline, how do you group documents by a field and count the occurrences?',
        options: [
          '{"$match": {"_id": "$field"}}',
          '{"$group": {"_id": "$field", "count": {"$sum": 1}}}',
          '{"$lookup": {"count": 1}}',
          '{"$project": {"count": 1}}'
        ],
        correctAnswerIndex: 1
      }
    ]
  }
];

export async function seedDatabase() {
  await connectToDatabase();

  // Try to drop legacy indexes if any
  try {
    await Task.collection.dropIndex('sequenceOrder_1');
  } catch (err) {
    // Ignore
  }

  const taskCount = await Task.countDocuments();
  // We check if the seeded task count is 8 and matches the detailed set
  if (taskCount !== 8) {
    console.log('Clearing and re-seeding default tasks for multi-track system with quiz questions...');
    await Task.deleteMany({});
    
    try {
      await Task.syncIndexes();
    } catch (indexErr) {
      console.warn('Syncing indexes warning:', indexErr);
    }
    
    await Task.insertMany(defaultTasks);
    console.log('Default tasks and quiz questions seeded successfully.');
  }
}
