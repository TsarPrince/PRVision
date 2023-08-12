const axios = require("axios");
const { searchExecuteCmd, findFileAndExecute } = require("../utils");

const commentsHandler = async (context) => {
  console.log("\nComments Handler\n");

  const { owner, repo, issue_number } = context.issue();

  // Check if the comment was posted on a pull request
  if (context.payload.issue.pull_request) {
    const comment = context.payload.comment.body;

    const { present, filename: commentFileName } = searchExecuteCmd(comment);
    if (!present) return;

    await findFileAndExecute(owner, repo, issue_number, commentFileName);
  }
};

module.exports = commentsHandler;
