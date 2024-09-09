import { StatusCodes } from 'http-status-codes';
import InvoiceModel from '../models/InvoiceModel.js';

export const getAllInvoices = async (req, res) => {
  console.log('req.query.pointDate ', req.query.pointDate);

  const invoices = await InvoiceModel.find({
    //  include: ClientModel,
    invoice_date: {
      $regex: new RegExp(req.query.pointDate),
    },
  }).populate('receiver_id');
  res.status(StatusCodes.OK).json({ invoices });
};

export const newInvoice = async (req, res) => {
  const invoice = await InvoiceModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ invoice });
};
