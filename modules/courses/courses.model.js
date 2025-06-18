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
        isPaid: {
            type: Boolean,
            required: [true, "Please specify if the course is paid"],
        },
        description: {
            type: String,
            trim: true,
            required: [true, "Course description is required"],
        },
        instructorName: {
            type: String,
            required: [true, "Instructor name is required"],
            trim: true,
        },
        courseImage: {
            type: String,
            required: [true, "Course image is required"],
        },
        startTime: {
            type: Date,
            default: null,
        },
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
