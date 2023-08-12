# PRemix

> A GitHub App built with [Probot](https://github.com/probot/probot) that PRemix is a github action bot which shows you the output of your code in your PR itself!

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t PRemix .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> PRemix
```

## Permission(s) required:

| `permission`         | `event` it listens to |
| -------------------- | --------------------- |
| contents: read       | push                  |
| issues: write        | issue_comment         |
| pull_requests: write | pull_request          |
| metadata: read       | (mandatory)           |

## Contributing

If you have suggestions for how PRemix could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2023 Prince Singh
