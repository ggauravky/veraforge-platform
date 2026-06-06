import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  sequenceOrder: number;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sequenceOrder: { type: Number, required: true, unique: true }
});

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
