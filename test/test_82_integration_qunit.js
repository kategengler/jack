

describe('Integration with Qunit',{
	after_each: function() {
		window.QUnit = null;
	}
	,
	'Should know when Qunit is in environment': function() {
		window.QUnit = "";
		value_of(jack.env.isQunit()).should_be_true();
	}
	,
	'Should know when Qunit not is in environment': function() {
		value_of(jack.env.isQunit()).should_be_false();
	}
	,
	'Should report unmet expectations by calling ok(false, message)': function() {
		var message = {m:'not called'};
		var called = 0;
		window.QUnit = "";
		window.ok = function(bool, message2) {
			called++;
			message.m = message2;
		};
		window.globalFunction = function() {};
		jack(function(){
				jack.expect("globalFunction").once();
			});

		value_of(called).should_be(1);
		value_of(message.m).should_be("Expectation failed: globalFunction() expected exactly 1 time, called 0 times");

		window.globalFunction = null;
		window.ok = null;
	}
    ,
    'Should report met expectations by calling ok': function() {
        var message = {m: 'not called'}
        var called = 0;
      	window.QUnit = "";
		window.ok = function(bool, message2) {
			called++;
			message.m = message2;
		};
        window.globalFunction = function() {};

        jack(function() {
           jack.expect("globalFunction").once();
            globalFunction();
        });
        value_of(called).should_be(1);
        value_of(message.m).should_be("Expectation: globalFunction() expected exactly 1 time, called 1 time");
        window.globalFunction = null;
        window.ok = null;
    }
    ,
    'Should report all met expectations by calling ok': function() {
        var messages = [];
        var called = 0;
      	window.QUnit = "";
		window.ok = function(bool, message2) {
			called++;
			messages.push(message2);
		};
        window.globalFunction = function() {};
        window.globalFunctionTwo = function() {};

        jack(function() {
           jack.expect("globalFunction").once();
           jack.expect("globalFunctionTwo").once();
            globalFunction();
            globalFunctionTwo();
        });

        value_of(called).should_be(2);
        value_of(messages[0]).should_be("Expectation: globalFunction() expected exactly 1 time, called 1 time");
        value_of(messages[1]).should_be("Expectation: globalFunctionTwo() expected exactly 1 time, called 1 time");
        window.globalFunction = null;
        window.ok = null;
    }
});
