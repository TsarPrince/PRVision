const pullRequestHandler = async (context) => {
  console.log("\npullRequestHandler\n");

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

    // Do something with the new commits
    console.log("New commits:", commits.data);
    require("fs").writeFileSync("commits.json", JSON.stringify(commits.data));
  }
};

module.exports = pullRequestHandler;
