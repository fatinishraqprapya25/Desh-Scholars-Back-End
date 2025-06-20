const mongoose = require('mongoose');

const courseModuleSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    moduleName: {
        type: String,
        required: true,
        trim: true
    },
    videoLink: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const CourseModule = mongoose.model('CourseModule', courseModuleSchema);

module.exports = CourseModule;
