import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  sequenceOrder: number;
  trackCategory: 'Web Development' | 'Data Science' | 'Artificial Intelligence' | 'Backend Engineering';
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sequenceOrder: { type: Number, required: true },
  trackCategory: {
    type: String,
    enum: ['Web Development', 'Data Science', 'Artificial Intelligence', 'Backend Engineering'],
    required: true,
  },
});

// Compound unique index for track and sequence order
TaskSchema.index({ trackCategory: 1, sequenceOrder: 1 }, { unique: true });

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
