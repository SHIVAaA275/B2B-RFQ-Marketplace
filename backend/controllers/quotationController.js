const mongoose = require("mongoose");
const Quotation = require("../models/Quotation");
const RFQ = require("../models/RFQ");

const createQuotation = async (req, res) => {
    try {
        const { price, estimatedDelivery, notes } = req.body;

        const { rfqId } = req.params;

        // Check whether RFQ ID has a valid MongoDB ObjectId format
        if (!mongoose.isValidObjectId(rfqId)) {
            return res.status(400).json({
                message: "Invalid RFQ ID"
            });
        }

        // Check required quotation fields
        if (
            !price ||
            !estimatedDelivery ||
            !estimatedDelivery.value ||
            !estimatedDelivery.unit
        ) {
            return res.status(400).json({
                message: "Price and estimated delivery are required"
            });
        }

        // Check whether price is a positive number
        if (typeof price !== "number" || price <= 0) {
            return res.status(400).json({
                message: "Price must be a number greater than 0"
            });
        }

        if (
        typeof estimatedDelivery.value !== "number" ||
        estimatedDelivery.value <= 0
        ) {
            return res.status(400).json({
                message: "Estimated delivery value must be a number greater than 0"
            });
        }

        if (
            !["days", "weeks", "months"].includes(estimatedDelivery.unit)
        ) {
            return res.status(400).json({
                message: "Estimated delivery unit must be days, weeks, or months"
        });
    }

        const rfq = await RFQ.findById(rfqId);

        if (!rfq) {
            return res.status(404).json({
                message: "RFQ not found"
            });
        }

        const quotation = await Quotation.create({
            rfq: rfqId,
            supplier: req.user.id,
            price,
            estimatedDelivery,
            notes
        });

        res.status(201).json({
            message: "Quotation submitted successfully",
            quotation
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({
                message: "You have already submitted a quotation for this RFQ"
            });
        }

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getMyQuotations = async (req, res) => {
    try {
        
        const quotations = await Quotation.find({
            supplier: req.user.id
            }).populate(
                "rfq",
                "productName description quantity deliveryLocation deadline"
            );

        res.status(200).json({
            message: "Quotations fetched successfully",
            quotations
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getQuotationsForRFQ = async (req, res) => {
    try {
        const { rfqId } = req.params;

        if (!mongoose.isValidObjectId(rfqId)) {
            return res.status(400).json({
                message: "Invalid RFQ ID"
            });
        }


        const rfq = await RFQ.findOne({
            _id: rfqId,
            buyer: req.user.id
        });

        
        if (!rfq) {
            return res.status(404).json({
                message: "RFQ not found or you are not authorized to view its quotations"
            });
        }

        const quotations = await Quotation.find({
            rfq: rfqId
        }).populate(
            "supplier",
            "name email"
        );

        res.status(200).json({
            message: "Quotations fetched successfully",
            quotations
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createQuotation,
    getMyQuotations,
    getQuotationsForRFQ
};