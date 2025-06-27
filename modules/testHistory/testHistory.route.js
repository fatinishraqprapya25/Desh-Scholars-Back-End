const testHistoryController = require("./testHistory.features");
const testHistoryRouter = require("express").Router();

testHistoryRouter.post("/", testHistoryController.create);
testHistoryRouter.get("/", testHistoryController.getAll);

module.exports = testHistoryRouter;