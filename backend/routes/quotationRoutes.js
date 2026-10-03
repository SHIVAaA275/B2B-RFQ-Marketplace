const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { createQuotation, getMyQuotations, getQuotationsForRFQ } = require("../controllers/quotationController");

const router = express.Router();

router.post(
    "/:rfqId",
    authMiddleware,
    roleMiddleware("supplier"),
    createQuotation
);

router.get('/my', authMiddleware, roleMiddleware("supplier"), getMyQuotations)

router.get(
    "/rfq/:rfqId",
    authMiddleware,
    roleMiddleware("buyer"),
    getQuotationsForRFQ
);



module.exports = router;