const mongoose = require("mongoose");
const RFQ = require("../models/RFQ");
const Quotation = require("../models/Quotation");

const createRFQ = async (req, res) => {
    try {
        const {
            productName,
            description,
            quantity,
            deliveryLocation,
            deadline
        } = req.body;

        if (
            !productName ||
            !description ||
            quantity == null ||
            !deliveryLocation ||
            !deadline
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (typeof quantity !== "number" || quantity <= 0) {
            return res.status(400).json({
                message: "Quantity must be a number greater than 0"
            });
        }

        const deadlineDate = new Date(deadline);

        if (isNaN(deadlineDate.getTime())) {
            return res.status(400).json({
                message: "Invalid deadline"
        });
    }

    if (deadlineDate <= new Date()) {
        return res.status(400).json({
            message: "Deadline must be a future date"
        });
    }

        const existingRFQ = await RFQ.findOne({
            buyer: req.user.id,
            productName,
            description,
            quantity,
            deliveryLocation,
            deadline
        });

        if (existingRFQ) {
            return res.status(409).json({
                message: "You have already created this RFQ"
            });
        }
        
        const rfq = await RFQ.create({
            productName,
            description,
            quantity,
            deliveryLocation,
            deadline,
            buyer: req.user.id
        });

        res.status(201).json({
            message: "RFQ created successfully",
            rfq
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getMyRFQs = async (req, res) => {
    try {
        const rfqs = await RFQ.find({
            buyer: req.user.id
        });

        res.status(200).json({
            message: "RFQs fetched successfully",
            rfqs
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const updateRFQ = async (req, res) => {
    try {
        const {
            productName,
            description,
            quantity,
            deliveryLocation,
            deadline
        } = req.body;

        const rfq = await RFQ.findOne({
            _id: req.params.id,
            buyer: req.user.id
        });

        if (!rfq) {
            return res.status(404).json({
                message: "RFQ not found or you are not authorized to edit it"
            });
        }

        const quotationExists = await Quotation.exists({
            rfq: req.params.id
        });

        if (quotationExists) {
            return res.status(409).json({
                message:
                    "This RFQ cannot be edited because quotations have already been submitted."
            });
        }

        rfq.productName = productName;
        rfq.description = description;
        rfq.quantity = quantity;
        rfq.deliveryLocation = deliveryLocation;
        rfq.deadline = deadline;

        await rfq.save();

        res.status(200).json({
            message: "RFQ updated successfully",
            rfq
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getAllRFQs = async (req, res) => {
    try {
        const { search } = req.query;

        let filter = {};

        if (search) {
            filter.productName = {
                $regex: search,
                $options: "i"
            };
        }

        const rfqs = await RFQ.find(filter).select(
            "productName description quantity deliveryLocation deadline createdAt"
        );

        res.status(200).json({
            message: "RFQs fetched successfully",
            rfqs
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getRFQById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid RFQ ID"
            });
        }

        const rfq = await RFQ.findById(id).select(
            "productName description quantity deliveryLocation deadline createdAt"
        );

        if (!rfq) {
            return res.status(404).json({
                message: "RFQ not found"
            });
        }

        res.status(200).json({
            message: "RFQ fetched successfully",
            rfq
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getBuyerRFQById = async (req, res) => {
    try {

        const rfq = await RFQ.findOne({
            _id: req.params.id,
            buyer: req.user.id
        });

        if (!rfq) {
            return res.status(404).json({
                message: "RFQ not found"
            });
        }

        res.status(200).json({
            rfq
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};

module.exports = { createRFQ, getMyRFQs, updateRFQ, getAllRFQs, getRFQById, getBuyerRFQById };