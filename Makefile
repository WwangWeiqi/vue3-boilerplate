NAME := $(shell node -p "require('./package.json').name")
name = docker-repo/${NAME}
VERSION := $(shell node -p "require('./package.json').version")
GIT_BRANCH := $(shell git branch -v | grep '*')
clean:
	docker rmi `docker images | grep ${name}`

build-dev:  
	docker buildx build --platform linux/amd64 --build-arg NODE_ENV=dev --build-arg GIT_BRANCH="${GIT_BRANCH}"  -t ${name}:dev .

push-dev:
	docker push ${name}:dev

deploy-dev:build-dev push-dev

build-release:
	docker buildx build --platform linux/amd64 --build-arg NODE_ENV=prod --build-arg  GIT_BRANCH="${GIT_BRANCH}" -t ${name}:${VERSION}-release .

tag-release:
	docker tag ${name}:${VERSION}-release ${name}:latest

push-release:
	docker push ${name}:${VERSION}-release;docker push ${name}:latest

deploy-release:build-release tag-release push-release

