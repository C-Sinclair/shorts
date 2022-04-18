build:
	go build -o shorts-server 

run: build
	./shorts-server

# watch and rebuild server on go file change
watch:
	ulimit -n 1000 
	reflex -s -r '\.go$$' make run
