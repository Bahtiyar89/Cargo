import { Router } from 'express';
const router = Router();

import {
  getAllInvoices,
  newInvoice,
} from '../controllers/invoiceController.js';

router.get('/', getAllInvoices);
router.post('/', newInvoice);

export default router;
