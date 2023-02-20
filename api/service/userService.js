const Login = require("../../models/Login");
const Logger = require("../../utils/logger");

const getLoginData = (data) => {
  try {
    console.log(data);
    let logger = new Logger(
      `ENTERING TO SERVICE METHOD GET USER DETAILS`,
      `${JSON.stringify(data)}`
    );
    return Login.findOne({
      where: data,
      raw: true,
    });
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
