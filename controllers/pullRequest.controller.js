const fs = require("fs");

const pullRequestHandler = async (context) => {
  console.log("\npullRequestHandler\n");

  const { owner, repo, issue_number } = context.issue();
  const { body, title, number: pull_number } = context.payload.pull_request;

  const pullRequestFiles = await context.octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number,
  });

  fs.writeFileSync("out.json", JSON.stringify(pullRequestFiles, null, 2));
};

module.exports = pullRequestHandler;
