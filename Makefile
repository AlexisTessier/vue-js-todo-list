SHELL=/bin/bash

VOLUME_NAME ?= $(shell pwd)
PROJECT_DIRECTORY ?= .

DEV_IMAGE_REGISTRY = alexistessier
DEV_IMAGE_NAME = vue-js-todo-list-dev
DEV_IMAGE_VERSION = 1.0.1
DEV_IMAGE_TAG = ${DEV_IMAGE_REGISTRY}/${DEV_IMAGE_NAME}:${DEV_IMAGE_VERSION}

DEV_CLIENT_PORT ?= 3008

build_dev_image:
	docker build --tag=${DEV_IMAGE_TAG} ./

push_dev_image:
	docker push ${DEV_IMAGE_TAG}

dev:
	docker run -it --rm \
		-v ${VOLUME_NAME}:/root/dev \
		-w /root/dev/${PROJECT_DIRECTORY} \
		-e CLIENT_PORT=${DEV_CLIENT_PORT} \
		--expose ${DEV_CLIENT_PORT} \
		-p ${DEV_CLIENT_PORT}:${DEV_CLIENT_PORT} \
		${DEV_IMAGE_TAG} /bin/bash

dev_shell:
	docker run -it --rm \
		-v ${DEV_DIRECTORY}:/root/dev \
		-w /root/dev/${PROJECT_DIRECTORY} \
		${DEV_IMAGE_TAG} /bin/bash