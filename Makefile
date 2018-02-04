#This Makefile is not intended to compile the project
#It is only for Travis-CI
test:
	cd express-server && npm install && npm test