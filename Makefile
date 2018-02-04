#This Makefile is not intended to compile the project
#It is only for Travis-CI
test:
	cd angular-client && ng build -w && cd ../express-server && npm install && npm test
