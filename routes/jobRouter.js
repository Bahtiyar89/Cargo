import { Router } from 'express';
import {
  getAllJobs,
  newJob,
  getJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';

const router = Router();

//router.get('/', getAllJobs);
//router.post('/', newJob);

router.route('/').get(getAllJobs).post(newJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

export default router;
