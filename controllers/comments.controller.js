const axios = require("axios");

const commentsHandler = async (context) => {
  console.log("\ncommentsHandler\n");

  console.log({ owner, repo, issue_number });

  // Check if the comment was posted on a pull request
  if (context.payload.issue.pull_request) {
    const comment = context.payload.comment.body;
    const commandRegex = /\/execute/i;
    const hasExecuteCommand = commandRegex.test(comment);
    console.log(comment);

    if (hasExecuteCommand) {
      const pullRequestFiles = await context.octokit.rest.pulls.listFiles({
        owner,
        repo,
        pull_number: issue_number,
      });
      for (const file of pullRequestFiles.data) {
        if (file.filename == "test.py") {
          const response = await axios.post(
            "https://emkc.org/api/v2/piston/execute",
            {
              language: "python",
              source: file.patch,
              version: "3.9.6",
            }
          );
          console.log(response.data);
        }
      }
    }
  }
};

module.exports = commentsHandler;
