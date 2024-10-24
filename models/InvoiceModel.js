import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema(
  {
    barcod: String,
    kg: String,
    price: String,
    ambalaj_type: String,
    vehicle_number: String,
    payed: Boolean,
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    invoice_date: String,
  },
  { timestamps: true }
);

export default mongoose.model('Invoice', InvoiceSchema);
