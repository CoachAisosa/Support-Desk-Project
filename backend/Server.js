const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT  || 5000

const app = express()

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))


// app.get('/', (req, res)=>{
//     res.json({message: 'Welcome to Support Desk API'})
// })


app.get('/', (req, res)=>{
    res.status(201).json({message: 'Welcome to Support Desk API'})
})

app.post('/', (req, res)=>{
    res.status(200).json({message: 'new user created'})
})

