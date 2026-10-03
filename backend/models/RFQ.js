const mongoose = require("mongoose");

const rfqSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        quantity: {
            type: Number,
            required: true
        },

        deliveryLocation: {
            type: String,
            required: true,
            trim: true
        },

        deadline: {
            type: Date,
            required: true
        },

        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const RFQ = mongoose.model("RFQ", rfqSchema);

module.exports = RFQ;