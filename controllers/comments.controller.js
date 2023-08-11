const axios = require("axios");
const { getRuntime } = require("../utils");

const commentsHandler = async (context) => {
  console.log("\ncommentsHandler\n");

  const { owner, repo, issue_number } = context.issue();
  console.log({ owner, repo, issue_number });

  // Check if the comment was posted on a pull request
  if (context.payload.issue.pull_request) {
    const comment = context.payload.comment.body;

    // split the comment with whitespaces
    const indexOfExecuteCmd = comment.split(/\s+/).indexOf("/execute");
    console.log(comment, indexOfExecuteCmd);

    if (indexOfExecuteCmd != -1) {
      const commentFileName = comment.split(/\s+/)[indexOfExecuteCmd + 1];
      const pullRequestFiles = await context.octokit.rest.pulls.listFiles({
        owner,
        repo,
        pull_number: issue_number,
      });

      let fileFound = false;
      for (const file of pullRequestFiles.data) {
        const { filename, raw_url } = file;
        if (filename == commentFileName) {
          fileFound = true;
          try {
            const fileExtension = filename.split(".").pop();
            const runtime = getRuntime(fileExtension);
            console.log({ fileExtension, runtime });
            const fileContent = await axios.get(raw_url);
            console.log(fileContent.data);

            // Credits: Piston Public API
            // https://github.com/engineer-man/piston#public-api
            // available runtimes can be found here:
            // https://emkc.org/api/v2/piston/runtimes

            const response = await axios.post(
              "https://emkc.org/api/v2/piston/execute",
              {
                ...runtime,
                files: [
                  // 🪲🪲🪲
                  // PISTON BUG: providing name results in error response
                  // for cpp files because backend is running
                  // ./a.out instead of ./filename.out
                  // MESSAGE: /piston/packages/gcc/10.2.0/run: line 6: ./a.out: No such file or directory
                  // 🪲🪲🪲
                  {
                    // name: filename,
                    content: fileContent.data,
                  },
                ],
                compile_timeout: 10000,
                run_timeout: 3000,
                compile_memory_limit: -1,
                run_memory_limit: -1,
              }
            );
            console.log(response.data);
            const executionResult = response.data;
            // Post the execution result as a reply to the comment
            await context.octokit.rest.issues.createComment({
              owner,
              repo,
              issue_number,
              body: `Execution Result:\n\`\`\`\n${
                executionResult.run.stdout || executionResult.run.stderr
              }\n\`\`\``,
            });
          } catch (error) {
            // catch axios or other errors

            console.error("Error executing code:\n\n", error);
            await context.octokit.rest.issues.createComment({
              owner,
              repo,
              issue_number,
              body: `Error executing code:\n\`\`\`\n${
                error.response?.data.message || error.message
              }\n\`\`\``,
            });
          }
        }
      }
      if (!fileFound) {
        await context.octokit.rest.issues.createComment({
          owner,
          repo,
          issue_number,
          body: `File \`${commentFileName}\` not found in this pull request. Available files are:\n\`\`\`\n${pullRequestFiles.data.reduce(
            (accumulator, current) => accumulator + current.filename + "\n",
            ""
          )}\n\`\`\``,
        });
      }
    }
  }
};

module.exports = commentsHandler;
