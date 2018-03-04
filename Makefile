#This Makefile is not intended to compile the project
#It is only for Travis-CI
test:
	 cd /angular-client && npm install && npm test && cd ../express-server && npm install && npm test