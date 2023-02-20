const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/config");
const cors = require("cors");
const router = require("./routes/routes");
const Login = require("./models/Login");
const { verifyToken } = require("./utils/utils");
const Tasks = require("./models/Tasks");
const { Validator } = require("./utils/validator");
var app = express();
require("dotenv/config");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
require("./models/index");

app.use(async (req, res, next) => {
  try {
    console.log(req.url);
    if (
      req.method !== "GET" &&
      req.method !== "DELETE" &&
      req.method !== "PUT"
    ) {
      await Validator[req.url.split("/")[2]].validateAsync(req.body);
    }
    next();
  } catch (error) {
    console.error(error);
    if (error && error.details && error?.details[0]?.message) {
      return res.status(504).send({
        msg: error.details[0].message,
        status: 504,
      });
    }
    return res.status(502).send({
      msg: "something went wrong",
      status: 502,
    });
  }
});

app.use(async (req, res, next) => {
  if (!req.url.includes("/login") && !req.url.includes("/user")) {
    await verifyToken(req, res, next);
  } else {
    next();
  }
});

app.use("/api", router);

app.listen(3000, console.log("server is running on 3000"));
