test-firefox:
	@nightwatch --filter test.js


test: test-firefox

test-mocha:
	@mocha --timeout 5000 tests/testm.js -R spec

coveralls: build-test
	@mocha --timeout 5000 tests/testm.js --require blanket --reporter mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js

test-cov: build-test
	@mocha --timeout 5000 tests/testm.js --require blanket -R html-cov > tests/covrage.html

.PHONY: build