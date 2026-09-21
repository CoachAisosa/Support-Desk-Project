const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const { json } = require('express')


// @desc  getTickets
// @route Get /api/ticket
// @access private
const getTickets = asyncHandler(async(req, res)=>{

// Get user using the id in the JWT
const user = await User.findById(req.user.id)

if(!user){
    res.status(401)
    throw new Error('User not found')
}

const tickets = await Ticket.find({user: req.user.id})



    res.status(200).json(tickets)

})


// @desc  getTicket (single ticket)
// @route Get /api/ticket/:id
// @access private
const singleTicket = asyncHandler(async(req, res)=>{

// Get user using the id in the JWT
const user = await User.findById(req.user.id)

if(!user){
    res.status(401)
    throw new Error('User not found')
}

const ticket = await Ticket.findById(req.params.id)

if(!ticket){
    res.status(404)
    throw new Error('Ticket not Found')
}

if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
}


    res.status(200).json(ticket)

})


// @desc  createTicket
// @route post /api/ticket
// @access private
const createTicket = asyncHandler(async(req, res)=>{
    const {product, description} = req.body

    if(!product || !description){
        res.status(400)
        throw new Error('please add product and description')
    }

// Get user using the id in the JWT
const user = await User.findById(req.user.id)

if(!user){
    res.status(401)
    throw new error('User not found')
}

const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
})

    res.status(201).json(ticket)

})


// @desc  deleteTicket 
// @route Delete /api/ticket/:id
// @access private
const deleteTicket = asyncHandler(async(req, res)=>{

// Get user using the id in the JWT
const user = await User.findById(req.user.id)

if(!user){
    res.status(401)
    throw new Error('User not found')
}

const ticket = await Ticket.findById(req.params.id)

if(!ticket){
    res.status(404)
    throw new Error('Ticket not Found')
}

if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
}

// await Ticket.remove()
await Ticket.findByIdAndDelete(req.params.id)

    res.status(200).json({message: 'Ticket was successfully deleted'})

})

// @desc  deleteTicket 
// @route Put /api/ticket/:id
// @access private
const updateTicket = asyncHandler(async(req, res)=>{

// Get user using the id in the JWT
const user = await User.findById(req.user.id)

if(!user){
    res.status(401)
    throw new Error('User not found')
}

const ticket = await Ticket.findById(req.params.id)

if(!ticket){
    res.status(404)
    throw new Error('Ticket not Found')
}

if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
}


const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: 'true'})

    res.status(200).json({message: 'Ticket just updated now'})

})


module.exports = {
 getTickets,
 singleTicket,
 createTicket,
 deleteTicket,
 updateTicket
}