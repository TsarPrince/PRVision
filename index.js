/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

const pullRequestHandler = require("./controllers/pullRequest.controller");
const commentsHandler = require("./controllers/comments.controller");

module.exports = (app) => {
  app.log.info("PRvision started!");

  app.on(
    ["pull_request.opened", "pull_request.edited", "pull_request.reopened"],
    pullRequestHandler
  );

  app.on("issue_comment.created", commentsHandler);
};
