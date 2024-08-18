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
import { checkForTestUser } from '../middleware/authMiddleware.js';

const router = Router();

//router.get('/', getAllJobs);
//router.post('/', newJob);

router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, newJob);

router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
