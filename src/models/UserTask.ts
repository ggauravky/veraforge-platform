import mongoose, { Schema, Document } from 'mongoose';

export interface IUserTask extends Document {
  userId: mongoose.Types.ObjectId;
  taskId: mongoose.Types.ObjectId;
  status: 'locked' | 'quiz_pending' | 'unlocked' | 'scanning' | 'submitted_pending_review' | 'approved' | 'rejected';
  submissionRepoLink?: string;
  submissionLiveLink?: string;
  adminFeedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserTaskSchema = new Schema<IUserTask>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  status: { 
    type: String, 
    enum: ['locked', 'quiz_pending', 'unlocked', 'scanning', 'submitted_pending_review', 'approved', 'rejected'], 
    default: 'locked' 
  },
  submissionRepoLink: { type: String },
  submissionLiveLink: { type: String },
  adminFeedback: { type: String }
}, { timestamps: true });

export default mongoose.models.UserTask || mongoose.model<IUserTask>('UserTask', UserTaskSchema);
