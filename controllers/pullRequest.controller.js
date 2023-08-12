const { searchExecuteCmd, findFileAndExecute } = require("../utils");

const pullRequestHandler = async (context) => {
  console.log("\nPull Request Handler\n");

  const { owner, repo, issue_number } = context.issue();
  // const { body, title, number: pull_number } = context.payload.pull_request;

  // Check if the action is 'synchronize'
  if (context.payload.action === "synchronize") {
    // New commits were pushed to the pull request
    const commits = await context.octokit.pulls.listCommits({
      owner,
      repo,
      pull_number: issue_number,
    });

    // ⚠️⚠️⚠️
    // This lists all the commits in the pull request
    // last one can be accessed however
    // this may quickly contribute to a huge payload
    // ⚠️⚠️⚠️
    console.log("#commits in this PR: ", commits.data?.length);
    const lastCommit = commits.data?.pop();
    const { message } = lastCommit.commit;
    const { present, filename: messageFileName } = searchExecuteCmd(message);
    if (!present) return;
    await findFileAndExecute(owner, repo, issue_number, messageFileName);
  }
};

module.exports = pullRequestHandler;
