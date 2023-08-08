import { Router } from "express"
import { createOrder, webhook } from "../controllers/payment.controller.js"

const router = Router();

router.post('/crear-orden', createOrder)

router.get('/success', (req, res) => res.send('success'))
router.get('/failure', (req, res) => res.send('failure'))
router.get('/pending', (req, res) => res.send('pending'))

router.post('/webhook', webhook )

export default router;