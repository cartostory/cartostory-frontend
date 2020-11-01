# https://medium.com/@slightlytyler/https-medium-com-slightlytyler-containerizing-modern-front-end-applications-part-2-5be2fde0be9f
ARGS?=
TAG=cartostory-frontend-build
TAG_DEV=cartostory-frontend-build

VOLUME_AUTH_CONFIG=-v $(PWD)/auth_config.json:/opt/app/auth_config.json
VOLUME_BABEL=-v $(PWD)/babel.config.js:/opt/app/babel.config.js
VOLUME_ENV=-v $(PWD)/.env:/opt/app/.env
VOLUME_ESLINTRC=-v $(PWD)/.eslintrc.js:/opt/app/.eslintrc.js
VOLUME_JEST_CONFIG=-v $(PWD)/jest.config.js:/opt/app/jest.config.js
VOLUME_LEFTHOOK=-v $(PWD)/lefthook.yml:/opt/app/lefthook.yml
VOLUME_MOCKS=-v $(PWD)/__mocks__:/opt/app/__mocks__
VOLUME_PACKAGE_JSON=-v $(PWD)/package.json:/opt/app/package.json
VOLUME_PACKAGE_LOCK=-v $(PWD)/package-lock.json:/opt/app/package-lock.json
VOLUME_PUBLIC=-v $(PWD)/public:/opt/app/public
VOLUME_SRC=-v $(PWD)/src:/opt/app/src
VOLUME_TESTS=-v $(PWD)/tests:/opt/app/tests
VOLUME_VUE_CONFIG=-v $(PWD)/vue.config.js:/opt/app/vue.config.js

VOLUME_MOUNTS=$(VOLUME_SRC) $(VOLUME_PACKAGE_JSON) $(VOLUME_ENV) $(VOLUME_ESLINTRC) $(VOLUME_JEST_CONFIG) $(VOLUME_LEFTHOOK) $(VOLUME_MOCKS) $(VOLUME_HUSKY) $(VOLUME_VUE_CONFIG) $(VOLUME_PUBLIC) $(VOLUME_AUTH_CONFIG) $(VOLUME_BABEL) $(VOLUME_TESTS)
VOLUME_MOUNTS_WITH_DEP_STUFF=$(VOLUME_MOUNTS) $(VOLUME_PACKAGE_LOCK)

build-prod:
	docker-compose -f docker-compose.yml build --force-rm

build-dev:
	docker build --network host -f Dockerfile.dev -t $(TAG_DEV):latest .

run-dev:
	docker run -it --rm -p 8080:8080 $(VOLUME_MOUNTS) $(TAG_DEV) \
		run serve --env.host=0.0.0.0

#make run-npm ARGS="add package/name"
run-npm:
	docker run --rm $(VOLUME_MOUNTS_WITH_DEP_STUFF) $(TAG_DEV) $(ARGS)

run-sh:
	docker run -it --rm --entrypoint "/bin/sh" $(VOLUME_MOUNTS) $(TAG_DEV) $(ARGS)

.PHONY:
	build-dev run-dev run-test

