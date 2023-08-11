/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

module.exports = (app) => {
  app.on(
    ["pull_request.opened", "pull_request.edited", "pull_request.reopened"],
    async (context) => {
      const { owner, repo } = context.issue();
      console.log({ owner, repo });

      const rootContent = await context.octokit.rest.repos.getContent({
        owner,
        repo,
        // path,
      });
      console.log(rootContent);
      for (const content of rootContent.data) {
        console.log(content);
        if (content.type === "file" && content.name === "code.js") {
          const testFile = await context.octokit.rest.repos.getContent({
            owner,
            repo,
            path: content.path,
          });
          console.log(testFile);
        }
      }

      // if (context.payload.pull_request.title.indexOf("🤖") > -1) {
      //   // context.octokit gives us access to an authenticated octokit/rest.js client to make GitHub API calls with ease.
      //   await context.octokit.pulls.createReview({
      //     ...context.pullRequest(),
      //     event: "APPROVE",
      //   });
      // }
    }
  );

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
