import { Router } from 'express';
import * as noteController from '../../controllers/noteController';
import authMiddleware from '../../middleware/authMiddleware';

const router = Router();
router.post('/', authMiddleware, noteController.CreatedNote);
router.get('/all', noteController.getAllNotes);
router.get('/noteid', authMiddleware, noteController.getNoteById);

export default router;
