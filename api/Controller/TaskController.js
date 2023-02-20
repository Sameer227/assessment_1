const Logger = require("../../utils/logger");
const {
  createTask,
  updateTask,
  deleteTask,
  getAllTaskData,
} = require("../service/TaskController");
const dbConfig = require("../../config/config");
const { QueryTypes } = require("sequelize");

const createTaskController = (req, res) => {
  let logger = new Logger(
    `ENTERING TO CONTROLLER METHOD CREATE TASK`,
    `${req.user_id}`
  );

  const { task, status, date } = req.body;
  let dateNow = new Date();

  if (status != "Completed" && status != "Incomplete") {
    return res.send({
      status: 502,
      msg: "status is incorrect, please give only Completed/Incomplete",
    });
  }

  let taskDB = {
    user_id: req.user_id,
    date: date ? date : dateNow.toLocaleDateString(),
    task: task,
    status: status,
  };

  createTask(taskDB)
    .then((createdTask) => {
      return res.send({
        status: 200,
        msg: "successfully created task",
        data: createdTask,
      });
    })
    .catch((err) => {
      logger.error(err);
      res.send({
        status: 502,
        msg: "technical error occured",
      });
    });
};

const editTaskController = (req, res) => {
  let logger = new Logger(
    `ENTERING TO CONTROLLER METHOD EDIT TASK`,
    `${req.user_id}`
  );

  const { task, status, date } = req.body;
  let updatedData = {};

  if (task) {
    updatedData.task = task;
  }

  if (status) {
    if (status != "Completed" && status != "Incomplete") {
      return res.send({
        status: 502,
        msg: "status is incorrect, please give only Completed/Incomplete",
      });
    }
    updatedData.status = status;
  }

  if (date) {
    updatedData.date = date;
  }

  logger.debug(
    `DB data => ${JSON.stringify(updatedData)} || id=> ${JSON.stringify(
      req.params
    )}`
  );
  updateTask(updatedData, { id: req.params.id })
    .then((createdTask) => {
      return res.send({
        status: 200,
        msg: "successfully updated task",
      });
    })
    .catch((err) => {
      logger.error(err);
      res.send({
        status: 502,
        msg: "technical error occured",
      });
    });
};

const deleteTaskController = (req, res) => {
  let logger = new Logger(
    `ENTERING TO CONTROLLER METHOD DELETE TASK`,
    `${req.user_id}`
  );

  if (!req.params) {
    return res.send({
      status: 502,
      msg: "pls provied id",
    });
  }

  logger.debug(` || id=> ${JSON.stringify(req.params)}`);
  deleteTask({ id: req.params.id })
    .then((createdTask) => {
      return res.send({
        status: 200,
        msg: "successfully deleted task",
      });
    })
    .catch((err) => {
      logger.error(err);
      res.send({
        status: 502,
        msg: "technical error occured",
      });
    });
};

const getAllTaskController = (req, res) => {
  let logger = new Logger(
    `ENTERING TO CONTROLLER METHOD GET ALL TASK`,
    `${req.user_id}`
  );

  const { page, list } = req.query;
  console.log(page, list);

  getAllTaskData(
    { user_id: req.user_id },
    ["id", "date", "task", "status"],
    page,
    list
  )
    .then((getTask) => {
      return res.send({
        status: 200,
        data: getTask,
      });
    })
    .catch((err) => {
      logger.error(err);
      res.send({
        status: 502,
        msg: "technical error occured",
      });
    });
};

const sortTaskController = (req, res) => {
  let logger = new Logger(
    `ENTERING TO CONTROLLER METHOD SORT ALL TASK`,
    `${req.user_id}`
  );

  const { sortedData } = req.body;

  logger.debug(`${JSON.stringify(sortedData)}`);

  let query1 = `
  UPDATE Task SET priority = 0 where user_id = ${req.user_id};
  UPDATE Task
SET priority = CASE `;
  let finalQuery = sortedData.reduce((prev, curr, idx) => {
    return prev + ` WHEN id = ${curr} THEN ${sortedData.length - idx} `;
  }, query1);

  finalQuery += `END where user_id = ${req.user_id};`;

  console.log("final query", finalQuery);

  //   let query = `
  //   UPDATE tasks
  //   SET position = CASE
  //     WHEN position = 1 THEN 3
  //     WHEN position = 2 THEN 1
  //     WHEN position = 3 THEN 2
  //   END;`

  dbConfig
    .query(finalQuery, {
      type: QueryTypes.UPDATE,
    })
    .then((resp) => {
      console.log(resp);
      res.send({
        status: 201,
        msg: "successfully sorted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status: 502,
        msg: "technical error occured",
      });
    });
};

module.exports = {
  createTaskController,
  editTaskController,
  deleteTaskController,
  getAllTaskController,
  sortTaskController,
};
