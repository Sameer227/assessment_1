const { createLogger, transports, format } = require("winston");

const customFormat = format.combine(
  format.timestamp(),
  format.printf((info) => {
    return `${info.timestamp} <Sameer's_Server> [${info.level
      .toUpperCase()
      .padEnd(7)}] => ${info.message}`;
  })
);

const logger = createLogger({
  format: customFormat,
  level: "debug",
  transports: [new transports.Console()],
});

class Logger {
  constructor(fnName, trace) {
    this.updateInfo(fnName, trace);

    if (fnName || trace) {
      this.info("Start");
    }
  }

  updateInfo(fnName, trace) {
    this.fnName = fnName;
    this.trace = trace;
  }

  info(...msg) {
    let msgLog = "";
    if (this.fnName) {
      msgLog = `${this.fnName} | `;
    }
    if (this.trace) {
      msgLog = `${msgLog} ${this.trace} | `;
    }

    msg[0] = `${msgLog} ${msg[0]}`;
    msg[0] = msg.join(" || ");
    logger.info(...msg);
  }

  debug(...msg) {
    let msgLog = "";

    if (this.fnName) {
      msgLog = `${this.fnName} | `;
    }
    if (this.trace) {
      msgLog = `${msgLog} ${this.trace} | `;
    }
    msg[0] = `${msgLog} ${msg[0]}`;
    msg = msg.map((data) => {
      if (typeof data == "object" || typeof data == "") {
        return `|| ${JSON.stringify(data)}`;
      }
      return data;
    });
    msg[0] = msg.join(" || ");

    logger.debug(...msg);
  }

  error(...msg) {
    let msgLog = "";

    if (this.fnName) {
      msgLog = `${this.fnName} | `;
    }
    if (this.trace) {
      msgLog = `${msgLog} ${this.trace} | `;
    }

    msg[0] = `${msgLog} ${msg[0]}`;
    logger.error(...msg);
  }
}

module.exports = Logger;
