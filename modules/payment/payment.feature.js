const Payment = require('./payment.model');
const sendResponse = require('../../utils/sendResponse');

const paymentFeatures = {};

paymentFeatures.createPayment = async (req, res) => {
    try {
        const {
            purchaseId,
            ammount,
            paymentMethod,
            transactionId,
            userId
        } = req.body;

        if (!purchaseId || !userId || !ammount || !paymentMethod || !transactionId) {
            return sendResponse(res, 400, {
                success: false,
                message: 'All required fields must be provided.',
            });
        }

        const existing = await Payment.findOne({ transactionId });
        if (existing) {
            return sendResponse(res, 409, {
                success: false,
                message: 'Transaction already exists.',
            });
        }

        const payment = await Payment.create({
            purchaseId,
            userId,
            amount: ammount,
            paymentMethod,
            transactionId,
        });

        return sendResponse(res, 200, {
            success: true,
            message: 'Payment created successfully',
            data: payment,
        });
    } catch (error) {
        console.log(error.message);
        return sendResponse(res, 500, {
            success: false,
            message: 'Failed to create payment',
            error: error.message,
        });
    }
};

paymentFeatures.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('userId');

        return sendResponse(res, 200, {
            success: true,
            message: 'Payments fetched successfully',
            data: payments,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Failed to fetch payments',
            error: error.message,
        });
    }
};

paymentFeatures.getApprovedPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ status: "Approved" });

        return sendResponse(res, 200, {
            success: true,
            message: 'Payments fetched successfully',
            data: payments,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Failed to fetch payments',
            error: error.message,
        });
    }
};

paymentFeatures.getMonthlyEarnings = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        const earnings = await Payment.aggregate([
            {
                $match: {
                    status: "Approved",
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01T00:00:00Z`),
                        $lte: new Date(`${currentYear}-12-31T23:59:59Z`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalEarnings: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    earnings: "$totalEarnings"
                }
            }
        ]);

        // Map MongoDB month numbers to month names
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyEarningsData = monthNames.map((name, index) => {
            const monthData = earnings.find((e) => e.month === index + 1);
            return {
                name,
                earnings: monthData ? monthData.earnings : 0
            };
        });

        return sendResponse(res, 200, {
            success: true,
            message: "Monthly earnings fetched successfully.",
            data: monthlyEarningsData
        });
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, {
            success: false,
            message: "Failed to fetch monthly earnings.",
            error: error.message
        });
    }
};

paymentFeatures.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['Approved', 'Pending'].includes(status)) {
            return sendResponse(res, 400, {
                success: false,
                message: 'Invalid status value',
            });
        }

        const payment = await Payment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!payment) {
            return sendResponse(res, 404, {
                success: false,
                message: 'Payment not found',
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: 'Payment status updated',
            data: payment,
        });
    } catch (error) {
        console.log(error.message);
        return sendResponse(res, 500, {
            success: false,
            message: 'Failed to update payment status',
            error: error.message,
        });
    }
};

paymentFeatures.getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id).populate('userId').populate('purchaseId');

        if (!payment) {
            return sendResponse(res, 404, {
                success: false,
                message: 'Payment not found',
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: 'Payment fetched successfully',
            data: payment,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Failed to get payment',
            error: error.message,
        });
    }
};

module.exports = paymentFeatures;
