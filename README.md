# Vue js todo list

## Development environment requirements

+ docker
+ make

## Start working

A docker image is available to develop. The following make goal will build that image (if not yet available from dockerhub):

```
make build_dev_image
```

To know what the image contains, look at the Dockerfile (the dev image is built from it).

Then you can run dev container using the image:

```
make dev
```

These will expose the required ports (see which ones in top of the Makefile) for accessing the server from your browser.

Eventually, you can do a *make dev_shell* to also run a container based on the dev image but which will not expose the ports (useful if you want to run other yarn commands while yarn start is running yet for example)

## Run the app in development mode 

Once the dev image is built, you have to:

+ run the dev container 

```
make dev
```

+ and then in this container, launch the dev server

```
cd web-app
yarn install (if necessary)
yarn run dev
```

## Scripts

### Run tests and linter

TO DO

### Build the statics

TO DO