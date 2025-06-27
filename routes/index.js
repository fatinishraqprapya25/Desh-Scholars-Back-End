const authRouter = require("../modules/auth/auth.route");
const adminRouter = require("../modules/admin/admin.routes");
const teacherRouter = require("../modules/teacher/teacher.route");
const courseRouter = require("../modules/courses/courses.route");
const moduleRouter = require("../modules/courseModules/courseModule.route");
const testRouter = require("../modules/practicetests/test.route");
const mcqRouter = require("../modules/mcqs/mcqs.route");
const resourceRouter = require("../modules/resources/resources.route");
const broadcastRouter = require("../modules/broadcasts/broadcasts.route");
const paymentRouter = require("../modules/payment/payment.route");
const courseMatrialRouter = require("../modules/courseMatrials/courseMatrials.route");
const mockRouter = require("../modules/mock/mock.route");
const mockQuestionRouter = require("../modules/mockQuestions/mockQuestions.route");
const testHistoryRouter = require("../modules/testHistory/testHistory.route");
const leaderboardRouter = require("../modules/leaderboard/leaderboard.route");

const router = require("express").Router();

const routes = [
    { path: "/auth", router: authRouter },
    { path: "/admin", router: adminRouter },
    { path: "/teacher", router: teacherRouter },
    { path: "/courses", router: courseRouter },
    { path: "/modules", router: moduleRouter },
    { path: "/tests", router: testRouter },
    { path: "/test-history", router: testHistoryRouter },
    { path: "/leaderboard-test", router: leaderboardRouter },
    { path: "/mock", router: mockRouter },
    { path: "/mockquestions", router: mockQuestionRouter },
    { path: "/mcq", router: mcqRouter },
    { path: "/resource", router: resourceRouter },
    { path: "/broadcasts", router: broadcastRouter },
    { path: "/matrials", router: courseMatrialRouter },
    { path: "/payments", router: paymentRouter }
];

routes.map(r => router.use(r.path, r.router));

module.exports = router;