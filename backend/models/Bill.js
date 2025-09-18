import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  units: { type: Number, required: true },
  rate: { type: Number, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: String, required: true },
  status: { type: String, default: 'unpaid' }
});

export default mongoose.model('Bill', billSchema);
