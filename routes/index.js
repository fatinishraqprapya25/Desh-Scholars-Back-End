const authRouter = require("../modules/auth/auth.route");
const router = require("express").Router();

const routes = [
    { path: "/auth", router: authRouter }
];

routes.map(r => router.use(r.path, r.router));

module.exports = router;