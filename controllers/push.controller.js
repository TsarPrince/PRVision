const { searchExecuteCmd } = require("../utils");

const pushHandler = async (context) => {
  console.log("\nPush Handler\n");

  const { owner, repo, issue_number } = context.issue();
  // issue_number is undefined for push events in PRs
  const commits = context.payload.commits;

  // multiple commits can be pushed at once
  for (const commit of commits) {
    const { message } = commit;
    const { present, filename: messageFileName } = searchExecuteCmd(message);
    if (!present) continue;
  }
};

module.exports = pushHandler;
