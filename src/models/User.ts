import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  fullName: string;
  email: string;
  universityName?: string;
  graduationYear?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  enrolledTrack?: string;
  accountStatus: 'pending_approval' | 'active' | 'rejected';
  role: 'student' | 'admin' | 'recruiter';
  companyName?: string;
  recruiterVerified?: boolean;
  graduated?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  universityName: { type: String },
  graduationYear: { type: String },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
  portfolioUrl: { type: String },
  companyName: { type: String },
  recruiterVerified: { type: Boolean, default: true },
  enrolledTrack: { type: String, default: null },
  accountStatus: { 
    type: String, 
    enum: ['pending_approval', 'active', 'rejected'], 
    default: 'pending_approval' 
  },
  role: { 
    type: String, 
    enum: ['student', 'admin', 'recruiter'], 
    default: 'student' 
  },
  graduated: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
