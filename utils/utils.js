const jwt = require("jsonwebtoken");
const { getLoginData } = require("../api/service/userService");
const Logger = require("./logger");

const createToken = (data) => {
  let log = new Logger(`ENTERING TO `, `UTIL_METHOD GENERATE_TOKEN`);
  log.debug(` | ${JSON.stringify(data)}`);
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data1 = {
    time: Date(),
    userId: data.id,
  };
  let token = jwt.sign(data1, jwtSecretKey, { expiresIn: "24h" });
  log.debug(` || token |  ${token}`);
  return token;
};

const verifyToken = async (req, res, next) => {
  let tokenHeaderKey = "Authorization";
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let log = new Logger(`ENTERING TO`, ` UTIL_METHOD  VERIFY_TOKEN`);
  try {
    let token = req.header(tokenHeaderKey);
    if (token) {
      token = token.slice(7);
    }
    log.debug(`${JSON.stringify(token)}`);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      log.debug(`DB Data => ${JSON.stringify(verified)}`);

      return await getLoginData({
        id: verified.userId,
      })
        .then((resp) => {
          log.debug(`${JSON.stringify(resp)}`);
          console.log("sss", resp);
          req.user_id = resp.id;
          next();
        })
        .catch((error) => {
          log.error(`${JSON.stringify(error)}`);
          console.log("sssaaa");

          return res.status(403).send({
            status: 403,
            msg: "unauthorised",
          });
        });
    } else {
      log.info(`unauthorized`);
      // Access Denied
      return res.status(403).send({
        status: 403,
        msg: "unauthorised",
      });
    }
  } catch (error) {
    // Access Denied
    log.info(`${JSON.stringify(error)}`);

    res.status(403).send({
      status: 403,
      msg: "unauthorised",
    });
  }
};

module.exports = {
  createToken,
  verifyToken,
};
