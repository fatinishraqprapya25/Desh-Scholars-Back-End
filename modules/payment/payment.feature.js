const Payment = require('./payment.model');
const sendResponse = require('../../utils/sendResponse');

const paymentFeatures = {};

paymentFeatures.createPayment = async (req, res) => {
    try {
        const {
            purchaseId,
            userId,
            amount,
            paymentMethod,
            transactionId,
        } = req.body;

        if (!purchaseId || !userId || !amount || !paymentMethod || !transactionId) {
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
            amount,
            paymentMethod,
            transactionId,
            metadata,
        });

        return sendResponse(res, 200, {
            success: true,
            message: 'Payment created successfully',
            data: payment,
        });
    } catch (error) {
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

paymentFeatures.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['approved', 'pending'].includes(status)) {
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
