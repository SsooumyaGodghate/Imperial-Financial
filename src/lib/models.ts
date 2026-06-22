import mongoose, { Schema, Document, Model } from 'mongoose';

// Lead Types & Schema
export interface ILead extends Document {
  name: string;
  phone: string;
  email: string;
  loanType: string;
  message: string;
  status: 'New' | 'Contacted' | 'Interested' | 'Converted' | 'Closed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    loanType: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Interested', 'Converted', 'Closed'],
      default: 'New',
      required: true,
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

// Audit Log Types & Schema
export interface IAuditLog extends Document {
  action: string;
  adminUser: string;
  details: string;
  ipAddress?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  action: { type: String, required: true },
  adminUser: { type: String, required: true },
  details: { type: String, required: true },
  ipAddress: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

// Avoid compiling models multiple times during dev hot-reloads
export const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
export const AuditLog: Model<IAuditLog> = mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
