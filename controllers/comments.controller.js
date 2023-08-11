const commentsHandler = async (context) => {
  const { owner, repo, number } = context.issue();
  console.log("commentsHandler");
  const octokit = context.octokit;

  // Check if the comment was posted on a pull request
  if (context.payload.issue.pull_request) {
    const pullRequest = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: number,
    });

    const commandRegex = /\/execute/i;
    const hasExecuteCommand = commandRegex.test(context.payload.comment.body);

    if (hasExecuteCommand) {
      const code = context.payload.comment.body;

      try {
        const pistonClient = new piston.Client();
        const executionResult = await pistonClient.execute(code);

        // Post the execution result as a reply to the comment
        await octokit.rest.issues.createComment({
          owner,
          repo,
          issue_number: number,
          body: `Execution Result:\n\`\`\`\n${executionResult}\n\`\`\``,
        });
      } catch (error) {
        // Handle any errors during code execution
        console.error("Error executing code:", error);
        await octokit.rest.issues.createComment({
          owner,
          repo,
          issue_number: number,
          body: `Error executing code:\n\`\`\`\n${error.message}\n\`\`\``,
        });
      }
    }
  }
};

module.exports = commentsHandler;
