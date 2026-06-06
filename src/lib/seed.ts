import Task from '@/models/Task';
import { connectToDatabase } from './db';

const defaultTasks = [
  {
    title: 'Build a Calculator App',
    description: 'Create a fully functional calculator application using HTML, CSS, and JavaScript. The calculator should support basic arithmetic operations (addition, subtraction, multiplication, division), decimals, clearing, and displaying results on a responsive screen.',
    sequenceOrder: 1,
  },
  {
    title: 'Build a Portfolio Website',
    description: 'Develop a highly professional and responsive personal portfolio website showcasing your skills, projects, and contact details. It must feature animations, smooth transitions, and layout sections such as Profile, Skills, Projects, and Contact.',
    sequenceOrder: 2,
  },
];

export async function seedDatabase() {
  await connectToDatabase();
  
  const taskCount = await Task.countDocuments();
  if (taskCount === 0) {
    console.log('Seeding default tasks...');
    await Task.insertMany(defaultTasks);
    console.log('Default tasks seeded successfully.');
  }
}
