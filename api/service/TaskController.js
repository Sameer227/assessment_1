const Login = require("../../models/Login");
const Tasks = require("../../models/Tasks");
const Logger = require("../../utils/logger");

const getOneTaskData = (data) => {
  try {
    console.log(data);
    let logger = new Logger(
      `ENTERING TO SERVICE METHOD GET Task DETAILS`,
      `${JSON.stringify(data)}`
    );
    return Tasks.findOne({
      where: data,
      raw: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getAllTaskData = (data, attr, offset = null, limit = null) => {
  try {
    console.log(data);
    let logger = new Logger(
      `ENTERING TO SERVICE METHOD GET ALL Task DETAILS`,
      `${JSON.stringify(data)}`
    );

    let queryParams = {
      where: data,
      raw: true,
      attributes: attr,
      order: [
        ["priority", "DESC"],
        ["id", "ASC"],
      ],
    };
    if (offset && limit) {
      queryParams.offset = (offset - 1) * limit;
      queryParams.limit = +limit;
    }
    console.log(queryParams);
    return Tasks.findAll(queryParams);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const createTask = (data) => {
  try {
    console.log(data);
    let logger = new Logger(
      `ENTERING TO SERVICE METHOD CREATE Task `,
      `${JSON.stringify(data)}`
    );
    return Tasks.create(data, {
      raw: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const updateTask = (data, condition) => {
  try {
    let logger = new Logger(
      `ENTERING TO SERVICE METHOD CREATE Task `,
      `${JSON.stringify(data)} || id => ${JSON.stringify(condition)}`
    );
    return Tasks.update(data, {
      where: condition,
      raw: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const deleteTask = (condition) => {
  try {
    let logger = new Logger(
      `ENTERING TO SERVICE METHOD DELETE Task `,
      `id => ${JSON.stringify(condition)}`
    );
    return Tasks.destroy({
      where: condition,
      raw: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  getAllTaskData,
  getOneTaskData,
  createTask,
  updateTask,
  deleteTask,
};
