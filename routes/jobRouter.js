import { Router } from 'express';
import {
  getAllJobs,
  newJob,
  getJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import {
  validateIdParam,
  validateJobInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

//router.get('/', getAllJobs);
//router.post('/', newJob);

router.route('/').get(getAllJobs).post(validateJobInput, newJob);
router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(validateJobInput, validateIdParam, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;
