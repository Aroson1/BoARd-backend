const chalk = import("chalk").then((m) => m.default);

async function log(message, type = "info", color = "") {
  let logMessage;

  if (!color) {
    switch (type) {
      case "info":
        color = "blue";
        break;
      case "warning":
        color = "yellow";
        break;
      case "error":
        color = "red";
        break;
      default:
        color = "white";
    }
  }

  try {
    logMessage = (await chalk)[color](message);
  } catch (error) {
    logMessage = (await chalk).white(message);
  }

  console.log(logMessage);
}

const sendResponse = (res, statusCode, data, message) => {
  return res.status(statusCode).send({ data, message });
};

module.exports = { log, sendResponse };
