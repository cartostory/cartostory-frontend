# https://medium.com/@slightlytyler/https-medium-com-slightlytyler-containerizing-modern-front-end-applications-part-2-5be2fde0be9f
ARGS?=
PORT=8080
TAG=cartostory-frontend-build
TAG_DEV=cartostory-frontend-build

VOLUME_AUTH_CONFIG=-v $(PWD)/auth_config.json:/opt/app/auth_config.json
VOLUME_BABEL=-v $(PWD)/babel.config.js:/opt/app/babel.config.js
VOLUME_ESLINTRC=-v $(PWD)/.eslintrc.js:/opt/app/.eslintrc.js
VOLUME_PACKAGE_JSON=-v $(PWD)/package.json:/opt/app/package.json
VOLUME_PUBLIC=-v $(PWD)/public:/opt/app/public
VOLUME_SRC=-v $(PWD)/src:/opt/app/src
VOLUME_VUE_CONFIG=-v $(PWD)/vue.config.js:/opt/app/vue.config.js
VOLUME_PACKAGE_LOCK=-v $(PWD)/package-lock.json:/opt/app/package-lock.json

VOLUME_MOUNTS=$(VOLUME_SRC) $(VOLUME_PACKAGE_JSON) $(VOLUME_ESLINTRC) $(VOLUME_VUE_CONFIG) $(VOLUME_PUBLIC) $(VOLUME_AUTH_CONFIG) $(VOLUME_BABEL)
VOLUME_MOUNTS_WITH_DEP_STUFF=$(VOLUME_MOUNTS) $(VOLUME_PACKAGE_LOCK)

build:
	docker build -f Dockerfile -t $(TAG):latest .

build-dev:
	docker build -f Dockerfile.dev -t $(TAG_DEV):latest .

run-dev:
	docker-compose -f docker-compose.dev.yml up

#make run-npm ARGS="add package/name"
run-npm:
	docker run -it --rm $(VOLUME_MOUNTS_WITH_DEP_STUFF) $(TAG_DEV) $(ARGS)

.PHONY:
	build-dev run-dev

