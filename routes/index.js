const authRouter = require("../modules/auth/auth.route");
const adminRouter = require("../modules/admin/admin.routes");
const teacherRouter = require("../modules/teacher/teacher.route");
const courseRouter = require("../modules/courses/courses.route");

const router = require("express").Router();

const routes = [
    { path: "/auth", router: authRouter },
    { path: "/admin", router: adminRouter },
    { path: "/teacher", router: teacherRouter },
    { path: "/courses", router: courseRouter }
];

routes.map(r => router.use(r.path, r.router));

module.exports = router;