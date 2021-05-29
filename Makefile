.DEFAULT_GOAL := run

version = `git fetch --tags >/dev/null && git describe --tags | cut -c 2-`
docker_container = akarasz/pajthy-frontend

.PHONY := run
run:
	npm start

.PHONY := docker
docker:
	docker build -t "$(docker_container):latest" .

.PHONY := release
release: docker
	docker tag $(docker_container):latest $(docker_container):$(version)

.PHONY := push
push: release
	docker push $(docker_container):latest
	docker push $(docker_container):$(version)