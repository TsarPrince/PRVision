/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on(
    ["pull_request.opened", "pull_request.edited", "pull_request.reopened"],
    async (context) => {
      const { owner, repo, number } = context.issue();

      fs.writeFileSync("out.json", JSON.stringify(context.payload, null, 2));
      fs.writeFileSync("out2.json", JSON.stringify(context.issue(), null, 2));
    }
  );

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
