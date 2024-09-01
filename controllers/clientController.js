import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';
import ClientModel from '../models/ClientModel.js';

export const getAllClients = async (req, res) => {
  console.log('req', req);
  const clients = await ClientModel.find({});
  res.status(StatusCodes.OK).json({ clients });
};

export const newClient = async (req, res) => {
  const client = await ClientModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ client });
};

export const getClient = async (req, res) => {
  const client = await ClientModel.findById(req.params.id);
  res.status(StatusCodes.OK).json({ client });
};

export const updateClient = async (req, res) => {
  const updatedClient = await ClientModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: 'client modified', client: updatedClient });
};

export const deleteClient = async (req, res) => {
  const removedClient = await ClientModel.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: 'client deleted', client: removedClient });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
