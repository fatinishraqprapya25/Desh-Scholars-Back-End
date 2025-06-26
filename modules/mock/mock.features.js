const Mock = require('./mock.model');
const sendResponse = require('../../utils/sendResponse');

const mockController = {};

mockController.createMock = async (req, res) => {
    try {
        const { name, duration, description } = req.body;

        if (!name || !duration) {
            return sendResponse(res, 400, {
                success: false,
                message: "Required fields: name and duration.",
            });
        }

        const newMock = new Mock({
            name,
            duration,
            description: description || '',
        });

        await newMock.save();

        return sendResponse(res, 201, {
            success: true,
            message: "Mock created successfully.",
            data: newMock,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while creating Mock.",
        });
    }
};

mockController.getAllMocks = async (req, res) => {
    try {
        const mocks = await Mock.find();
        return sendResponse(res, 200, {
            success: true,
            message: "Mocks fetched successfully.",
            data: mocks,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while fetching mocks.",
        });
    }
};

mockController.getMockById = async (req, res) => {
    try {
        const { id } = req.params;
        const mock = await Mock.findById(id);
        if (!mock) {
            return sendResponse(res, 404, {
                success: false,
                message: "Mock not found.",
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "Mock fetched successfully.",
            data: mock,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while fetching mock.",
        });
    }
};

mockController.updateMock = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedMock = await Mock.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedMock) {
            return sendResponse(res, 404, {
                success: false,
                message: "Mock not found.",
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "Mock updated successfully.",
            data: updatedMock,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while updating mock.",
        });
    }
};

mockController.deleteMock = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMock = await Mock.findByIdAndDelete(id);

        if (!deletedMock) {
            return sendResponse(res, 404, {
                success: false,
                message: "Mock not found.",
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "Mock deleted successfully.",
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while deleting mock.",
        });
    }
};

module.exports = mockController;
