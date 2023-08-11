const fs = require("fs");

const pullRequestHandler = async (context) => {
  console.log("pullRequestHandler");
  const { owner, repo } = context.issue();
  const {
    body,
    title,
    number: pull_number,
    comments_url,
  } = context.payload.pull_request;

  // s.split(" ").indexOf("/execute");

  const pullRequestFiles = await context.octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number,
  });

  fs.writeFileSync("out.json", JSON.stringify(pullRequestFiles, null, 2));
};

module.exports = pullRequestHandler;
