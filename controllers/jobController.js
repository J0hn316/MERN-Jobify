import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

// Get all jobs app.get('/api/v1/jobs)
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

// Create Job app.post('/api/v1/jobs')
export const createJob = async (req, res) => {
  const { company, position } = req.body;

  const job = await Job.create({ company, position });

  res.status(StatusCodes.CREATED).json({ job });
};

// GET SINGLE JOB app.get('/api/v1/jobs/:id')
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ job });
};

// EDIT JOB app.patch or app.put('/api/v1/jobs/:id')
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

// DELETE JOB app.delete('/api/v1/jobs/:id')
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  if (!removedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ job: removedJob });
};
