const runtimes = require("../constants/runtimes.constants.json");

const getRuntime = (extension) => {
  for (const runtime of runtimes) {
    if (runtime.aliases.includes(extension) || runtime.language == extension) {
      return runtime;
    }
  }
};

const searchExecuteCmd = (message) => {
  // split the comment with whitespaces
  // ASSUMPTION: /execute command is always followed by a filename
  const indexOfExecuteCmd = comment.split(/\s+/).indexOf("/execute");
  const filename = comment.split(/\s+/)[indexOfExecuteCmd + 1];

  return {
    present: indexOfExecuteCmd !== -1,
    filename,
  };
};

module.exports = {
  getRuntime,
  searchExecuteCmd,
};
