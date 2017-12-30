#This Makefile is not intended to compile the project
#It is only for Travis-CI

test:
	express-server/npm test
