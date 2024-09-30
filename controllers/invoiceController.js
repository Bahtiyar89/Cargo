import { StatusCodes } from 'http-status-codes';
import InvoiceModel from '../models/InvoiceModel.js';

export const getAllInvoices = async (req, res) => {
  const { vehicle_number, pointDate, monthDate } = req.query;
  console.log('monthDate ', monthDate);
  console.log('vehicle_number ', vehicle_number);
  console.log('pointDate ', pointDate);

  const invoices = await InvoiceModel.find({
    //  include: ClientModel,
    invoice_date:
      pointDate == 'Invalid date'
        ? { $exists: true, $ne: null }
        : {
            $regex: new RegExp(pointDate),
          },
    createdAt:
      monthDate == undefined || monthDate == 'Invalid date'
        ? { $exists: true, $ne: null }
        : {
            $gte: new Date(monthDate).setHours(0, 0, 0),
            $lt: new Date(monthDate).setHours(23, 59, 59),
          },

    vehicle_number:
      vehicle_number == undefined || vehicle_number == ''
        ? { $exists: true, $ne: null }
        : vehicle_number,
  }).populate('receiver_id');
  res.status(StatusCodes.OK).json({ invoices });
};

export const newInvoice = async (req, res) => {
  const invoice = await InvoiceModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ invoice });
};

export const getInvoice = async (req, res) => {
  const invoice = await InvoiceModel.findById(req.params.id);
  res.status(StatusCodes.OK).json({ invoice });
};
