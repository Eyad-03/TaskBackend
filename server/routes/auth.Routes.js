import express from 'express';
import { getCurrentUser, login, register } from '../controllers/auth.Controller.js';

const router = express.Router();

router.post('/auth/login', login)

router.post('/auth/register', register)

router.get('/auth/me', getCurrentUser)

export default router;