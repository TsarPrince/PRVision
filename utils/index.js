const runtimes = require("../constants/runtimes.constants.json");

const getRuntime = (extension) => {
  for (const runtime of runtimes) {
    if (runtime.aliases.includes(extension) || runtime.language == extension) {
      return runtime;
    }
  }
};

module.exports = {
  getRuntime,
};
