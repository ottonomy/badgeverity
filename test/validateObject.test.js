const test = require('tap').test;
const validator = require('../lib/validateObject.js')
//const ls = require('../lib/loadSchema.js');
//var monk = require('monk');
//var db = monk('localhost/badgeveritytest');



test("Validate a super simple schema", function(t){
	var schema = {type: "string"};
	var subject = "hardworking gumshoes";

	//validator returns an array of errors
	var result = validator.validateBadgeObject(subject,schema);
	t.equal(result.length, 0, "Validator should return no errors on a super simple schema");
	t.end();
});

test("Validate a failing schema", function(t){
	var schema = {
		"@schema": "http://json-schema.org/draft-04/schema#",
		type: "string"};
	var subject = ["hardworking gumshoes","the chief"];

	//validator returns an array of errors
	var result = validator.validateBadgeObject(subject,schema);
	t.equal(result.length, 1, "Validator should return an error on a single property schema that has the wrong data type for a property.");
	t.end();
});

