import mongoose from 'mongoose';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
const JobSchema = new mongoose.Schema(
  {
    sender: String,
    sender_phone: String,
    receiver: String,
    receiver_phone: String,
    address: String,
  },
  { timestamps: true }
);

export default mongoose.model('Client', JobSchema);
