import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  certificateId: string; // Unique UUID
  userId: mongoose.Types.ObjectId;
  issueDate: Date;
  trackName: string;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>({
  certificateId: { type: String, required: true, unique: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  issueDate: { type: Date, default: Date.now },
  trackName: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
