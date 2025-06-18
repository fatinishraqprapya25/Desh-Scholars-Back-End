const authRouter = require("../modules/auth/auth.route");
const adminRouter = require("../modules/admin/admin.routes");

const router = require("express").Router();

const routes = [
    { path: "/auth", router: authRouter },
    { path: "/admin", router: adminRouter }
];

routes.map(r => router.use(r.path, r.router));

module.exports = router;