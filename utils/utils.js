const jwt = require("jsonwebtoken");
const { getLoginData } = require("../api/service/userService");
const Logger = require("./logger");
const {v4: uuidv4} = require('uuid');
const { getOneSessionData } = require("../api/service/SessionService");

const createToken = (data) => {
  let log = new Logger(`ENTERING TO `, `UTIL_METHOD GENERATE_TOKEN`);
  log.debug(` | ${JSON.stringify(data)}`);
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  let token = jwt.sign(data, jwtSecretKey, { expiresIn: "30s" });
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

      let session = await getOneSessionData({
        session_id:verified.session_id
      })
      console.log(session);

      if(!session){
        return res.status(403).send({
          status: 403,
          msg: "unauthorised",
        });
      }

      let date = new Date()
      let ms = date.getTime()

      if(ms > session.session_end_at || ms < session.session_start_at){
        return res.status(403).send({
          status: 403,
          msg: "unauthorised",
        });
      }

      return await getLoginData({
        id: verified.id
      })
        .then((resp) => {
          log.debug(`${JSON.stringify(resp)}`);
          console.log("sss", resp);
          req.user_id = resp.id;
          req.user = verified
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
