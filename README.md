# Techie Relationship Management

The **Techie Relationship Management (TRM)** project at [TechLabs](https://techlabs.org) provides a data platform to store & analyze all information we have about our Techies (participants). We want to know **who they are** and **how they're doing** throughout their journey to become a Digital Shaper.

This project aims to provide a **standardized platform** across TechLabs locations. It **integrates** with existing tools within the TechLabs organization, such as TypeForm, GSuite, and Slack. The **TRM Dashboard** is a web application for the local journey teams to view, edit, and analyze the data for their Techies to get actionable insights for improving the TechLabs experience.

## Resources

- [Techie Relationship Management page on Notion](https://www.notion.so/techlabs/Techie-Relationship-Management-0b51be902d724043b756e1a32cca24c4) – used for scope & project planning, to-dos, and meeting notes
- [Slack Channel](https://techlabs-mgmt.slack.com/archives/C017RB4P0PL) on the TechLabs MGMT Slack workspace

## Architecture

![TRM project architecture](doc/resources/architecture.svg)

As for the main components, we have Hasura, the TRM Dashboard, and some [serverless functions](https://www.twilio.com/docs/glossary/what-is-serverless-architecture) for integrating external providers.

- The [Hasura GraphQL engine](https://hasura.io/) provides a GraphQL API used by the TRM dashboard and provider integrations.
- The TRM Dashboard is a React single-page web application (SPA) based on the [_react-admin_](https://marmelab.com/react-admin/) framework. See [`/frontend/`](frontend/) for the dashboard source code.
- The serverless functions in [`/functions/`](/functions/) integrate the TRM project with external providers, such as for authentification with Google, retrieving form responses from TypeForm, and fetching activity data from edyoucated & Slack.
- PostgreSQL is used for data storage & retrieval

## Development

We're happy that you want to work with us to make the TRM even more awesome! :tada:

Try to work your way to the documentation & setup steps outlined below. If you have any questions or are stuck with the setup, do not hestitate to call for help on [Slack](https://techlabs-mgmt.slack.com/archives/C017RB4P0PL)! :relieved:
### Technical Onboarding

You should familiarize yourself with the architecture as described in the [Architecture section](#Architecture). In particular, have a look what [Hasura](https://hasura.io/) and [react-admin](https://marmelab.com/react-admin/) are, and how they integrate with the GraphQL API.

This is a list of relevant resources like documentation, books, and conference talks:

* [Introduction to Hasura with React & Apollo](https://hasura.io/learn/graphql/react/introduction/)

  The TRM uses this exact stack in combination with [react-admin](https://marmelab.com/react-admin/) as a user interface & frontend data management framework.

* [Introduction to GraphQL with Hasura](https://hasura.io/learn/graphql/hasura/introduction/)

   This introduction to GraphQL and how to use it with Hasura will familiarize yourself with the way React & Hasura play together behind the scenes. You will create a basic todo app and see how Hasura works with foreign key relationships, authorization, authentication and custom business logic.

   The TRM uses Google Auth (provided by the [`/functions/auth`](/functions/auth) serverless function) instead of Auth0, but the JSON Web Token (JWT) issuance & verification is the same.

   We use remote schemas and event triggers to integrate with Google Sheets, Typeform, and edyoucated.

* [React-Admin 30-minute tutorial](https://marmelab.com/react-admin/Tutorial.html)

   Marmelab's 30-minute react-admin tutorial will show you how react-admin works in combination with a simple placeholder data source. You'll see how to map API resources to the frontend, and how to customize the frontend.

   The TRM will use Apollo with the Hasura GraphQL API for data storage & retrieval, but working with a simple JSON API first may be an easier way with less moving parts to learn react-admin.

* YouTube Guides

   If you're more into watching intro videos, have a look at these tutorials on YouTube:

   * [Scott Tries Hasura - A Realtime GraphQL API Builder](https://www.youtube.com/watch?v=LOWWtldWKYA)

   * [React Admin Crash Course](https://www.youtube.com/watch?v=HRmdj-HpJyE)

   * Hasura, GraphQL, React, Apollo – [Part 1](https://www.youtube.com/watch?v=M8KzVeRjpEI) and [Part 2](https://www.youtube.com/watch?v=YEfijJbblDQ)

If you feel like you have a general understanding how it works together, proceed to setup the development environment on your local machine as explained below.

### Requirements

Must-Have:

- Docker (Desktop) – [Docker for Mac](https://docs.docker.com/docker-for-mac/install/) / [Docker for Windows](https://docs.docker.com/docker-for-windows/install/)

May-Have:

- [NodeJS](https://nodejs.org/en/) v13.9.0 or higher
- [Yarn](https://yarnpkg.com/) v1.22.4 or higher
- [NPM](https://npmjs.com/) v6.13.7 or higher

_Local NodeJS, Yarn and NPM installations are required in case you want to develop on your local machine instead of in a container._

### Setup

1. Clone repository

1. Build images for Hasura & functions

   ```
   docker-compose build --parallel
   ```

1. Start Postgres, Hasura & functions:

   ```
   docker-compose up -d hasura
   ```

1. Start the frontend development server:

   ```
   docker-compose up frontend
   ```

   After 30s or so it should say `You can now view trm-frontend in the browser.`.

1. Verify everything is running and healthy:

   ```
   docker-compose ps
   ```

   It should say `Up (healthy)` for every service.

1. (Only required if developing locally) Setup frontend for development:

   * The following commands are assumed to be run in the `/frontend` directory (`cd frontend`)

   * `yarn install` downloads the dependencies

   * Run `cp config.example.js config.js` for an example config which is set up to work with the local database &
     Hasura instance you brought up with `docker-compose`.

### Usage

* Generate Sample Data

   * It is not much fun to work with an empty database. This is why there is an included data generator which you can
     use to populate the database with some near-realistic data. This generator is also used on the staging environment.

   * Generate some techies:

     1. Create a Semester in the frontend and copy its UUID (shown in the location bar like `http://localhost:3000/#/semesters/UUID`)

     1. Run the techie generator:

        ```
        docker-compose run --rm data-generator -- generate techies 100 --semester UUID --location LOCATION
        ```

        (location is `BERLIN`, for example)

* Frontend Development

   * `yarn start` starts a development server on port 3000 with support for live code reloading.

     Run this in the `/frontend` directory (`cd frontend`).

     It should open the browser at [`http://localhost:3000`](http://localhost:3000) automatically.

* Hasura Development

  * Run `docker-compose exec hasura hasura-cli console --address 0.0.0.0 --no-browser` and open [http://localhost:9695](http://localhost:9695) for the Hasura console.

  * You can find the Admin Secret in `docker-compose.yml` (`hasura` service, environment variables, `HASURA_GRAPHQL_ADMIN_SECRET`)

  * Authorization works with the Admin Secret, but you may want to use token authorization (e.g. for testing roles & permissions).

    Generate a token with `docker-compose run --rm data-generator -- generate token --location BERLIN --team-member-id ID --functional-team JOURNEY --roles user,hr,journey`.

    Then add the `Authorization` header in the Hasura GraphQL Explorer with `Bearer TOKEN` as its value (replace `TOKEN` with the output of the `generate token` command).

  * (Optional, for setup) Generate new JWT Secret Key: `openssl rand 256 | base64`

## Deployment

The project is deployed on [Google Cloud Platform (GCP)](https://cloud.google.com/). Follow the [guide for setting up GCP](/docs/google-cloud-setup.md).

The infrastructure (see [`/infrastructure/`](/infrastructure/)) is managed with [Terraform](https://www.terraform.io/) in two projects:

- [`/infrastructure/common`](/infrastructure/common) for all shared resources between environments: the Cloud SQL PostgreSQL database and a Google Artifact Registry Repository
- [`/infrastructure/app`](/infrastructure/app) provides resources for a specific environment: the Hasura instance as a [Cloud Run](https://cloud.google.com/run) service, and the serverless functions in [Cloud Functions](https://cloud.google.com/functions)

The deployment process runs the [GitHub Actions](https://github.com/features/actions) [`deploy` workflow](/.github/workflows/deploy.yml)  for every push to the deployment branches:

- `staging` branch for the _staging_ environment
- `production` branch for the _production_ environment

The TRM Dashboard is deployed on [GitHub pages](https://pages.github.com/). GitHub Actions builds the frontend and commits the build in the following repositories:

- [`TechLabs-Berlin/trm-frontend-staging`](https://github.com/TechLabs-Berlin/trm-frontend-staging) – for the _staging_ environment
- [`TechLabs-Berlin/trm-frontend-production`](https://github.com/TechLabs-Berlin/trm-frontend-production) – for the _production_ environment

## Contributing

We appreciate any contribution and are happy to get in touch. If you see a problem, please [open an issue](https://github.com/TechLabs-Berlin/trm/issues/new) in this repository. For write access to this repository, please send a message on our [Slack Channel](https://techlabs-mgmt.slack.com/archives/C017RB4P0PL)

To contribute code, we use a Pull Request workflow:

1. Create a branch with your proposed changes and [open a Pull Request](https://github.com/TechLabs-Berlin/trm/compare)
2. We work with you for review and merge your code into the `main` branch.

## License

The `TechLabs-Berlin/trm` project is [licensed MIT](LICENSE.txt). Learn more about MIT license on [_choosealicense.com_](https://choosealicense.com/licenses/mit/).

