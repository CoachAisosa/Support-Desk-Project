const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')

const connectDB = require('./config/db')

const PORT = process.env.PORT  || 5000

//  connect to database
connectDB()

const app = express()

const {errorHandler} = require('./middleware/errorMiddleware')


// route

app.use(express.json())

// app.use(express.text())

// app.use((req, res, next) => {
//   if (req.is('text/plain')) {
//     try {
//       req.body = JSON.parse(req.body); // Convert text to JSON
//     } catch (err) {
//       return res.status(400).json({ message: 'Invalid JSON in text/plain body' });
//     }
//   }
//   next();
// });

app.use(express.urlencoded({extended: false}))


//routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))


app.get('/', (req, res)=>{
    res.status(201).json({message: 'Welcome to Support Desk API'})
})

app.use(errorHandler)


app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))

// app.post('/', (req, res)=>{
//     res.status(200).json({message: 'new user created'})
// })

