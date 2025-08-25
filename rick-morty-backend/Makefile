APP_NAME=rick-morty-api
LDFLAGS=-ldflags "-w -s"

.PHONY: build run test docker-build docker-run

build:
	go build $(LDFLAGS) -o bin/$(APP_NAME) ./cmd/api/main.go

run:
	go run ./cmd/api/main.go

docker-build:
	docker build -t $(APP_NAME):dev -f deployments/docker/Dockerfile .

docker-run:
	docker run -p 8080:8080 $(APP_NAME):dev
