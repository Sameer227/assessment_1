const Login = require("../../models/Login");
const Sessions = require("../../models/Sessions");
const Logger = require("../../utils/logger");

const getLoginData = (data, join = null) => {
  try {
    console.log(data);
    let logger = new Logger(
      `ENTERING TO SERVICE METHOD GET USER DETAILS`,
      `${JSON.stringify(data)}`
    );

    let query = {
      where: data,
      raw: true,
    }
    return Login.findOne(query);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const createuser = (data) => {
  try {
    console.log(data);
    let logger = new Logger(
      `ENTERING TO SERVICE METHOD CREATE User `,
      `${JSON.stringify(data)}`
    );
    return Login.create(data, {
      raw: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { getLoginData, createuser };
