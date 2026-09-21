const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const { getTickets, singleTicket, createTicket, deleteTicket, updateTicket } = require('../controllers/ticketController')


// Re-route into noteRouter
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, singleTicket).delete(protect, deleteTicket).put(protect, updateTicket)



module.exports = router