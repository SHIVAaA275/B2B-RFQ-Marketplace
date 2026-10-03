const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
    {
        rfq: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RFQ",
            required: true
        },

        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        estimatedDelivery: {
            value: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                enum: ["days", "weeks", "months"],
                required: true
            }
        },

        notes: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

    quotationSchema.index(
        { rfq: 1, supplier: 1 },
        { unique: true }
    );

const Quotation = mongoose.model("Quotation", quotationSchema);

module.exports = Quotation;