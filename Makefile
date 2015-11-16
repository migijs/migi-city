test-firefox:
	@nightwatch --filter test.js

test-chrome:
	@nightwatch --filter test.js --env chrome

test-ie:
	@nightwatch --filter test.js --env ie

test-firefox-lie:
	@nightwatch --filter test-lie.js

test: build-test test-mocha test-firefox

test-mocha:
	@mocha --timeout 5000 tests/testm.js -R spec

coveralls: build-test
	@mocha --timeout 5000 tests/testm.js --require blanket --reporter mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js

test-cov: build-test
	@mocha --timeout 5000 tests/testm.js --require blanket -R html-cov > tests/covrage.html

.PHONY: build