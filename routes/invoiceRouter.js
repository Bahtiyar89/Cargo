import { Router } from 'express';
const router = Router();

import {
  getAllInvoices,
  getInvoice,
  newInvoice,
} from '../controllers/invoiceController.js';

router.get('/', getAllInvoices);
router.post('/', newInvoice);
router.get('/:id', getInvoice);

export default router;
