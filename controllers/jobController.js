import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';
import JobModel from '../models/JobModel.js';
import { NotFoundError } from '../errors/customErrors.js';

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

export const getAllJobs = async (req, res) => {
  const jobs = await JobModel.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const newJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await JobModel.create({ company, position });
  res.status(StatusCodes.CREATED).json({ job });
  /*
  if (!company || !position) {
    res.status(400).json({ msg: 'please provide company and position' });
  }
  try {
    const job = await JobModel.create('something');
    res.status(201).json({ job });
  } catch (error) {
    res.status(500).json({ msg: 'server error' });
  }
  res.status(201).json({ job });*/
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await JobModel.findById(id);

  if (!job) throw new NotFoundError(`no job with id : ${id}`);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) throw new NotFoundError(`no job with id : ${id}`);

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await JobModel.findByIdAndDelete(id);

  if (!removedJob) throw new NotFoundError(`no job with id : ${id}`);
  res.status(StatusCodes.OK).json({ job: removedJob });
};
