const Login = require("../../models/Login");
const Sessions = require("../../models/Sessions");
const Tasks = require("../../models/Tasks");

const Logger = require("../../utils/logger");

const getOneSessionData = (data) => {
  try {
    console.log(data);
    let logger = new Logger(
      `ENTERING TO SERVICE METHOD GET Session DETAILS`,
      `${JSON.stringify(data)}`
    );
    return Sessions.findOne({
      where: data,
      raw: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getAllSessionData = (data) => {
  try {
    console.log(data);
    let logger = new Logger(
      `ENTERING TO SERVICE METHOD GET ALL Session DETAILS`,
      `${JSON.stringify(data)}`
    );

    let queryParams = {
      where: data,
      raw: true
    };
    console.log(queryParams);
    return Sessions.findAll(queryParams);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const createSession = (data) => {
  try {
    console.log(data);
    let logger = new Logger(
      `ENTERING TO SERVICE METHOD CREATE SESSION `,
      `${JSON.stringify(data)}`
    );
    return Sessions.create(data, {
      raw: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const updateSession = (data, condition) => {
  try {
    let logger = new Logger(
      `ENTERING TO SERVICE METHOD UPDATE SESSION `,
      `${JSON.stringify(data)} || id => ${JSON.stringify(condition)}`
    );
    return Sessions.update(data, {
      where: condition,
      raw: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const deleteSession = (condition) => {
  try {
    let logger = new Logger(
      `ENTERING TO SERVICE METHOD DELETE SESSION `,
      `id => ${JSON.stringify(condition)}`
    );
    return Sessions.destroy({
      where: condition,
      raw: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
    deleteSession,
    updateSession,
    createSession,
    getAllSessionData,
    getOneSessionData
};
