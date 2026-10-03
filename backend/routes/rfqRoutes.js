const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createRFQ, getMyRFQs, updateRFQ, getAllRFQs, getRFQById, getBuyerRFQById } = require("../controllers/rfqController");
const roleMiddleware = require('../middleware/roleMiddleware')

const router = express.Router();

router.post("/create",
     authMiddleware,
     roleMiddleware('buyer'),
     createRFQ);

router.get("/my",
     authMiddleware,
     roleMiddleware('buyer'),
     getMyRFQs);

router.put('/:id',
     authMiddleware,
     roleMiddleware('buyer'),
     updateRFQ);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("supplier"),
    getAllRFQs);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("supplier"),
    getRFQById
     );

router.get(
    "/buyer/:id",
    authMiddleware,
    roleMiddleware("buyer"),
    getBuyerRFQById
);

module.exports = router;