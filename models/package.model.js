import mongoose from "mongoose";

const packageModel = new mongoose.Schema({
    to: {
        type: String,
        required: true
    },
    noDay: {
        type: Number,
        required: true
    },
    noNight: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    imagePublicId: {
        type: String,
        required: true
    },
    currPrice: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    prevPrice: {
        type: Number,
        default: 0
    },
    packageType: {
        type: String,
        enum: ['r', 'o'],
        default: 'r'
    },
    offerName: {
        type: String
    },
    totalTickets: {
        type: Number,
        required: true
    },
    ticketsBooked: {
        type: Number,
        default: 0
    },
    users: [
        {
            name: {
                type: String,
            },
            email: {
                type: String,
            },
            mobile: {
                type: Number,
            },
            noOfTicketsBooked: {
                type: Number,
            }
        }
    ]
}, {timestamps: true})



export const Package = mongoose.model('Package', packageModel)
