# Introductions app

This app is a [Remix](https://remix.run/) application, which uses [React](https://reactjs.org/). A few handy links:

- [Remix documentation](https://remix.run/docs)
- [React documentation](https://reactjs.org/docs/getting-started.html)
- [React Testing Library documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [This application](https://dccc-intros-staging.herokuapp.com/) running online

## Development

### Using Visual Studio Code Development Containers

A quick way to get up and running is to use Development Containers within the code editor Visual Studio Code. You’ll need:

- [Visual Studio Code](https://code.visualstudio.com/)
- The [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) Visual Studio Code extension.
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Open the folder in Visual Studio Code and follow the prompts to re-open the window using the Development Container. You’ll now be running code within a Docker image complete with all needed dependencies at the correct versions.

Use Visual Studio Code’s features to start the `dev` npm script, or press <kbd>Control</kbd> + <kbd>~</kbd> to open a Terminal window within the Docker image. At the prompt, run:

```sh
yarn run dev
```

Exit the development server by hitting <kbd>Control</kbd> + <kbd>C</kbd>.

To run tests:

```sh
yarn run test
```

### Using Docker locally

If Visual Studio Code is not your preferred editor, you can use Docker Compose to run the application with dependencies locked to their correct versions. You’ll need:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Within the project directory, run:

```sh
docker compose up
```

Exit the development server by hitting <kbd>Control</kbd> + <kbd>C</kbd>.

To run tests:

```sh
docker compose run app test
```

### Using Node.js locally

If you run into trouble with Docker, you can install dependencies and run the code on your development machine directly. You’ll need:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/), which you can install using `npm install -g yarn`

Within the project directory, run:

```sh
yarn run dev
```

Exit the development server by hitting <kbd>Control</kbd> + <kbd>C</kbd>.

To run tests:

```sh
yarn run test
```

## Deployment

The application is deployed automatically to [a staging environment](https://dccc-intros-staging.herokuapp.com/) when anything is merged into the `main` branch. You’ll need [@adunkman](https://github.com/adunkman) to promote this build to production for now.

Open a pull request, and you’ll see a temporary deployment of just your changes — click _View Deployment_ on your pull request to click through and make sure everything is working the way you expect.

A bit about how this is done:

- [Heroku Pipelines](https://devcenter.heroku.com/articles/pipelines) uses the [app.json](./app.json) file to configure review environments for each pull request.
- [Terraform](https://www.terraform.io/) uses the files in [./terraform](./terraform/) to configure the pipeline, staging, and production environments.
  - A `plan` step is run on every pull request to preview any infrastructure changes that will be made when the pull request is merged.
  - An `apply` step is run when changes are merged into production to modify cloud infrastructure.

How the application is built into a slug on Heroku:

- The version of node.js specified in [package.json](./package.json) is installed.
- Heroku’s nodejs buildpack runs:
  ```sh
  yarn install
  yarn run build
  ```
- After the slug is built, it uses `yarn start` to run the application.
