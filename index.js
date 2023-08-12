/**
 * @param {import('probot').Probot} app
 */

const pullRequestHandler = require("./controllers/pullRequest.controller");
const commentsHandler = require("./controllers/comments.controller");
const pushHandler = require("./controllers/push.controller");

module.exports = (app) => {
  app.log.info("PRvision started!");

  app.on(
    // ["pull_request.opened", "pull_request.edited", "pull_request.reopened"],
    "pull_request",
    pullRequestHandler
  );

  app.on("issue_comment.created", commentsHandler);
  app.on("push", pushHandler);
};
