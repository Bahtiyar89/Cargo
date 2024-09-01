import { Router } from 'express';
const router = Router();
import {
  deleteClient,
  getAllClients,
  getClient,
  newClient,
  updateClient,
} from '../controllers/clientController.js';
import {
  validateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

router.get('/', getAllClients);
router.post('/', newClient);
router.get('/:id', getClient);
router.patch('/:id', updateClient);
router.delete('/:id', deleteClient);
/*
router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route('/stats').get(showStats);

router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);
*/
export default router;
