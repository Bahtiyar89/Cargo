import { Router } from 'express';
const router = Router();

import {
  deleteInvoice,
  getAllInvoices,
  getInvoice,
  newInvoice,
  updateInvoice,
} from '../controllers/invoiceController.js';

router.get('/', getAllInvoices);
router.post('/', newInvoice);
router.get('/:id', getInvoice);
router.route('/:id').patch(updateInvoice);
router.route('/:id').delete(deleteInvoice);

export default router;
