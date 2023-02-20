const { getLoginData, createuser } = require("../service/userService");
const Crypto = require("crypto-js/sha256");
const { createToken } = require("../../utils/utils");
const Logger = require("../../utils/logger");
const { sendmail } = require("../../utils/Mail");

const loginController = (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  let logger = new Logger(`ENTERING TO CONTROLLER METHOD`, `${username}`);
  if (!username || !password) {
    return res.send({
      status: 401,
      msg: "username or password not provided",
    });
  }

  getLoginData({ username: username.toLowerCase() })
    .then((loginInfo) => {
      logger.debug(`${JSON.stringify(loginInfo)}`);
      if (!loginInfo) {
        return res.send({
          status: 502,
          msg: "user not found",
        });
      }
      var payloadPassword = JSON.stringify(Crypto(password).words);
      let compare = passwordCompare(payloadPassword, loginInfo.password);
      logger.debug(`${JSON.stringify(compare)}`);

      if (!compare) {
        return res.send({
          status: 502,
          msg: "password is incorrect",
        });
      }

      const token = createToken({ id: loginInfo.id });
      logger.debug(`${token}`);
      return res.send({
        status: 200,
        msg: "Sucessfully Logged In",
        token: token,
      });
    })
    .catch((err) => {
      console.error(err);
      return {
        status: 502,
        msg: "something went wrong",
      };
    });
};

const userCreateController = async (req, res) => {
  let logger = new Logger(
    `ENTERING TO CONTROLLER METHOD CREATE User`,
    `${req.user_id}`
  );

  const { email } = req.body;
  let password = Math.random().toString(36).slice(2);

  let userDB = {
    username: email,
    password: JSON.stringify(Crypto(password).words),
  };

  let getUser = await getLoginData({ username: email });

  if (getUser) {
    return res.send({
      status: "502",
      msg: "user already exist",
    });
  }

  createuser(userDB)
    .then(async (createdUser) => {
      await sendmail({ email, password });
      return res.send({
        status: 200,
        msg: "successfully created User",
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

function passwordCompare(password, dbPassword) {
  console.log(password);
  console.log(dbPassword);
  if (password === dbPassword) {
    console.log("compared");
    return true;
  } else {
    console.log("not compared");
    return false;
  }
}

module.exports = { loginController, userCreateController };
