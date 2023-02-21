let express = require("express");
const {
  loginController,
  userCreateController,
  logoutController,
} = require("../api/Controller/userController");
const {
  createTaskController,
  editTaskController,
  deleteTaskController,
  getAllTaskController,
  sortTaskController,
} = require("../api/Controller/TaskController");
var router = express.Router();

router.post("/login", loginController);
router.get("/logout", logoutController);
router.post("/user", userCreateController);
router.post("/task", createTaskController);
router.post("/sort", sortTaskController);
router.get("/task", getAllTaskController);
router.patch("/task/:id", editTaskController);
router.delete("/task/:id", deleteTaskController);

module.exports = router;
