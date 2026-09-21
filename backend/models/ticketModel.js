const mongoose = require('mongoose')

// define schema for model ticket document.
const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    product: {
        type: String,
        required: [true, 'Please select product'],
        enum: ['iPhone', 'Macbook Pro', 'HP Elitebook', 'HP Probook']
    },

    description: {
        type: String,
        required: [true, 'Please specify issue'],
        
    },

    status: {
        type: String,
        enum: ['new', 'opened', 'closed'],
        default: 'new'
    }
},

{
    timestamps: true
}

)

// Create a model based on the schema
const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket 


