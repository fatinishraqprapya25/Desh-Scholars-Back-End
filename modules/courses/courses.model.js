const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: [true, "Course name is required"],
            trim: true,
        },
        courseType: {
            type: String,
            enum: ["live", "recorded"],
            required: [true, "Course type is required"],
        },
        courseStatus: {
            type: String,
            enum: ["active", "inactive", "draft"],
            default: "draft",
        },
        duration: {
            type: String,
            required: true,
            default: "0 Hours"
        },
        isPaid: {
            type: Boolean,
            required: [true, "Please specify if the course is paid"],
        },
        price: {
            type: String,
        },
        description: {
            type: String,
            trim: true,
            required: [true, "Course description is required"],
        },
        instructorId: {
            type: mongoose.Types.ObjectId,
            required: [true, "Instructor id is required"],
        },
        courseImage: {
            type: String,
        },
        startTime: {
            type: Date,
            default: null,
        },
        ratings: {
            type: Array,
            default: []
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

courseSchema.pre('save', function (next) {
    if (this.courseType === 'live' && !this.startTime) {
        return next(new Error("Start time is required for live courses"));
    }
    next();
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
