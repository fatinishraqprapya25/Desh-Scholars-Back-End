const Course = require("./courses.model");
const sendResponse = require("../../utils/sendResponse");
const path = require("path");
const Payment = require("../payment/payment.model");

const courseFeatures = {};

courseFeatures.createCourse = async (req, res) => {
    try {
        const {
            courseName,
            courseType,
            courseStatus,
            isPaid,
            price,
            courseDescription,
            instructorId,
            level,
            startTime
        } = req.body;

        if (courseType === "live" && !startTime) {
            return sendResponse(res, 400, {
                success: false,
                message: "Start time is required for live courses."
            });
        }

        // Handle uploaded file
        let courseImagePath = null;
        if (req.file) {
            courseImagePath = path.join(process.cwd(), req.file.path);
        }

        const newCourse = new Course({
            courseName,
            courseType,
            courseStatus,
            isPaid,
            description: courseDescription,
            startTime: courseType === "live" ? startTime : null,
            courseImage: courseImagePath,
            price,
            instructorId,
            level
        });

        await newCourse.save();

        sendResponse(res, 201, {
            success: true,
            message: "Course created successfully.",
            data: newCourse
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Server error while creating course."
        });
    }
};

courseFeatures.getCoursesWithEnrolledCount = async (req, res) => {
    try {
        const courses = await Course.find({ isDeleted: false });

        const courseWithCounts = await Promise.all(
            courses.map(async course => {
                const count = await Payment.countDocuments({
                    purchaseId: course._id,
                    status: 'Approved'
                });

                return {
                    ...course.toObject(),
                    enrolledCount: count
                };
            })
        );

        return sendResponse(res, 200, {
            success: true,
            message: 'Courses with enrolled counts fetched successfully.',
            data: courseWithCounts
        });
    } catch (err) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Server error while fetching courses with enrollment count.',
            error: err.message
        });
    }
};

courseFeatures.getAllCourses = async (req, res) => {
    try {
        const { search, level, price } = req.query;

        const filter = { isDeleted: false };

        // Search filter on courseName or description (case-insensitive)
        if (search) {
            const searchRegex = new RegExp(search, "i");
            filter.$or = [
                { courseName: searchRegex },
                { description: searchRegex },
            ];
        }

        // Level filter using case-insensitive regex for exact match
        if (level) {
            filter.level = { $regex: new RegExp(`^${level}$`, "i") };
        }

        // Price filter: free or paid
        if (price) {
            if (price.toLowerCase() === "paid") {
                filter.isPaid = true;
            } else if (price.toLowerCase() === "free") {
                filter.isPaid = false;
            }
        }

        const courses = await Course.find(filter);

        return sendResponse(res, 200, {
            success: true,
            message: "Courses fetched successfully.",
            data: courses,
        });
    } catch (err) {
        return sendResponse(res, 500, {
            success: false,
            message: "Server error while fetching courses.",
        });
    }
};

courseFeatures.get2Courses = async (req, res) => {
    try {
        const totalCourses = await Course.countDocuments({ isDeleted: false });

        if (totalCourses < 2) {
            const availableCourses = await Course.find({ isDeleted: false });
            return sendResponse(res, 200, {
                success: true,
                message: "Less than two courses available.",
                data: availableCourses,
            });
        }

        const randomCourses = await Course.aggregate([
            { $match: { isDeleted: false } },
            { $sample: { size: 2 } }
        ]);

        return sendResponse(res, 200, {
            success: true,
            message: "Two random courses fetched successfully.",
            data: randomCourses,
        });

    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Failed to fetch random courses.",
            error: error.message,
        });
    }
};


courseFeatures.getCourseByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const payments = await Payment.find({ userId, status: 'Approved' });

        if (!payments.length) {
            return sendResponse(res, 200, {
                success: true,
                message: "No courses found!",
                data: [],
            });
        }

        const courseIds = payments.map(payment => payment.purchaseId);

        const courses = await Promise.all(
            courseIds.map(id => Course.findById(id))
        );

        const filteredCourses = courses.filter(course => course);

        return sendResponse(res, 200, {
            success: true,
            message: "Courses fetched successfully",
            data: filteredCourses,
        });
    } catch (err) {
        return sendResponse(res, 500, {
            success: false,
            message: "Error fetching user's courses",
            error: err.message,
        });
    }
};


courseFeatures.getCourseById = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id, isDeleted: false });

        if (!course) {
            return sendResponse(res, 404, {
                success: false,
                message: "Course not found"
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Course found",
            data: course
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error getting course"
        });
    }
};

courseFeatures.getCourseByTeacherId = async (req, res) => {
    try {
        const course = await Course.find({ instructorId: req.params.id, isDeleted: false });

        if (!course) {
            return sendResponse(res, 404, {
                success: false,
                message: "no courses found!"
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "courses fetched successfully!",
            data: course
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error getting course"
        });
    }
};

courseFeatures.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        if (req.file) {
            const filePath = path.join(process.cwd(), req.file.path);
            updatedData.courseImage = filePath;
        }
        if (updatedData.courseType === "live" && !updatedData.startTime) {
            return sendResponse(res, 400, {
                success: false,
                message: "Start time is required for live courses"
            });
        }
        if (updatedData.courseType === "recorded") delete updatedData.startTime;
        const updated = await Course.findOneAndUpdate(
            { _id: id, isDeleted: false },
            updatedData,
            { new: true }
        );

        if (!updated) {
            return sendResponse(res, 404, {
                success: false,
                message: "Course not found"
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Course updated successfully",
            data: updated
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: err.message
        });
    }
};

courseFeatures.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Course.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deleted) {
            return sendResponse(res, 404, {
                success: false,
                message: "Course not found or already deleted"
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: "Course soft deleted successfully"
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error deleting course"
        });
    }
};

module.exports = courseFeatures;
