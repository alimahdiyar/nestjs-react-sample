### Installation

_Installation process for the repository_

1. Clone the repo

   ```sh
   git clone https://github.com/alimahdiyar/nestjs-react-sample.git

   ```

2. Install NPM packages
   ```sh
   npm install or npm i
   ```
3. Create a dotnev file in the apps/api folder
   ```sh
   POSTGRES_USER=DATABASE_USERNAME
   POSTGRES_PASSWORD=DATABASE_PASSWORD
   POSTGRES_DB=DATABASE_NAME
   DATABASE_URL=DOCKER_DATABASE_URL
   ```
4. Setting up docker
   ```sh
   docker compose up dev-db -d
   ```
5. Migrate the the database using prisma
   ```sh
   npx prisma migrate dev
   ```
6. The repo is now ready to use

### tests

#### Frontend (e2e)

```sh
npm run dev:host --workspace=client
npm run cypress:open --workspace=client # while the server is running by the previous command
```

#### Backend (e2e)

```sh
npm run test:e2e --workspace=api # database should be running
```

#### Backend (unit)

```sh
npm run test --workspace=api
```

### Usage

_Basic commands and code examples for this repository_

Start the application

```sh
npm run dev
```

Building the application

```sh
npm run build
```

Running the build

```sh
npm run start
```

### License

Distributed under the MIT License.
