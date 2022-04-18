install-api:
	go mod download

install-ui:
	pnpm install

build-api:
	go build -o shorts-server 

build-ui:
	pnpm run build

run-api: build-api
	./shorts-server

# watch and rebuild server on go file change
watch-api:
	ulimit -n 1000 
	reflex -s -r '\.go$$' make run-api
