# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```
development mode

```
npm start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Change port via .env
Make a copy from .env.examle file at name it to .env. Change port to other, run the application.

## Open API Doc Generation

Run

```
npm run start
```

And go to `http://localhost:PORT/doc` page in your browser (PORT depends on your `.env` file).

### Build the Docker images using the provided Dockerfile

To start the docker container: `npm run docker:build:up`

## Scanning for vulnerabilities

You can either run `docker:scan` to scan all images, or use `docker:scan:postgres` to scan postgres image and `docker:scan:app` to run the app image.

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Endpoints

### Users
 - GET /user: Get all users
 - GET /user/:id: Get single user by id
 - POST /user: Create user
 - PUT /user/:id: Update user's password
 - DELETE /user/:id: Delete user

### Tracks
 - GET /track: Get all tracks
 - GET /track/:id: Get single track by id
 - POST /track: Create new track
 - PUT /track/:id: Update track info
 - DELETE /track/:id: Delete track

### Artists
 - GET /artist: Get all artists
 - GET /artist/:id: Get single artist by id
 - POST /artist: Create new artist
 - PUT /artist/:id: Update artist info
 - DELETE /artist/:id: Delete artist

### Albums
 - GET /album: Get all albums
 - GET /album/:id: Get single album by id
 - POST /album: Create new album
 - PUT /album/:id: Update album info
 - DELETE /album/:id: Delete album

### Favorites
 - GET /favs: Get all favorites
 - POST /favs/track/:id: Add track to favorites
 - DELETE /favs/track/:id: Delete track from favorites
 - POST /favs/album/:id: Add album to favorites
 - DELETE /favs/album/:id: Delete album from favorites
 - POST /favs/artist/:id: Add artist to favorites
 - DELETE /favs/artist/:id: Delete artist from favorites

