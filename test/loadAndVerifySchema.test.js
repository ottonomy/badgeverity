const test = require('tap').test;
const fs = require('fs');
const validator = require('../lib/validateObject.js');
const oven = require('openbadges-bakery');

const ls = require('../lib/loadSchema.js');
var monk = require('monk');
var db = monk('localhost/badgeveritytest');

var standard = fs.readFileSync("./testfiles/standard.json",'utf-8');

var numTests = 0;

function endTest(t){
	t.end();
	numTests += 1;
	if (numTests === 4)
		db.close();
} 




test("Read a schema: look it up by identifier, retrieve actual schema", function (t){
	var schemaCollection = db.get('schematovalidatefrom');

    var schemaToTest = {
        "@schema": "http://json-schema.org/draft-04/schema#",
        type: "object",
        properties: {
            hurf: { type: "string", format: "uri" }
        },
        required: ['hurf']
    };

    var subjectToTest = { hurf: "durf" };

	//set up database, add something.
	ls.storeSchemaObject("thekey",schemaToTest,schemaCollection, function (err,doc) {
		t.equal(err,null, "There should be no error inserting something.");
		t.type(doc, "object","insert should return an object");
		
		// (reference, collection, callback) 
  		ls.retrieveSchemaByReference("thekey",schemaCollection,function (err, doc){
  		 	t.equal(err,null, "There should be no error asking findSchemaObject for what we just input.");
  		 	t.type(doc,"object","findSchemaObject should return an object");

  		 	t.deepEqual(doc,schemaToTest, "We should get the actual JSON Schema we stored.");

            //validate results, which will return an array of errors.
            var validationResults = validator.validateBadgeObject(subjectToTest,doc);
            t.equal(validationResults.length, 0, "Validation should return no errors.");


  		 	schemaCollection.drop(function (err, doc) {
  		 		endTest(t);
  		 	});
  		 	
  		});

	});

});



test("Get some useful errors from validating on an invalid instance", function (t){
    var schemaCollection = db.get('somebadinstancesgonnagetcha');

    var schemaToTest = {
        "@schema": "http://json-schema.org/draft-04/schema#",
        id: "http://example.com/schema", 
        type: "object",
        properties: {
            hurf: { type: "string", format: "uri" }
        },
        required: ['hurf']
    };

    var subjectToTest = { hufff: "durf", array: [1,2,3,4,5] };

    //set up database, add something.
    ls.storeSchemaObject("thekey",schemaToTest,schemaCollection, function (err,doc) {
        t.equal(err,null, "There should be no error inserting something.");
        t.type(doc, "object","insert should return an object");
        
        // (reference, collection, callback) 
        ls.retrieveSchemaByReference("thekey",schemaCollection,function (err, doc){
            t.equal(err,null, "There should be no error asking findSchemaObject for what we just input.");
            t.type(doc,"object","findSchemaObject should return an object");

            t.deepEqual(doc,schemaToTest, "We should get the actual JSON Schema we stored.");

            //validate results, which will return an array of errors.
            var validationResults = validator.validateBadgeObject(subjectToTest,doc);
            t.equal(validationResults[0]['kind'], "ObjectValidationError", "Validation should give us some nice errors.");


            schemaCollection.drop(function (err, doc) {
                endTest(t);
            });
            
        });

    });

});

test("Test a sample assertion object against the OBI standard combined schema", function(t){
    var assertion = {
        uid: "12345",
        recipient: {
            type: "email",
            hashed: false,
            identity: "hello@example.org"
        },
        badge: "http://example.org/abadge",
        verify: {
            type: "hosted",
            url: "http://example.org/assertion"
        },
        issuedOn: 1293849872
    };

    //validate results, which will return an array of errors.
    var validationResults = validator.validateBadgeObject(assertion,JSON.parse(standard));
    t.equal(validationResults.length, 0, "There shouldn't be any errors at all when validating against the OBI schema. Duh");
    // t.equal(validationResults, [1], "Validation should give us some nice errors.");
    endTest(t);
});



test("Extract the assertion from a badge image to test against the assertion schema", function (t){
    var badgeImage = fs.readFileSync("./testfiles/test.png");

    oven.extract(badgeImage,function(err, assertion){
        t.equal(err,null,"There should be no errors extracting badge metadata.");
        if (!err){
            assertionObject = JSON.parse(assertion);
            validationResults = validator.validateBadgeObject(assertionObject,JSON.parse(standard));
            // t.equal(assertionObject,{"string-cheese": true}, "uncomment to see what the badge object is");
            t.equal(validationResults.length,0,"There should be no validation errors on the assertion in an image");
            // t.equal(validationResults,[1],"let's look at the validation errors");
        }
        endTest(t);
    });

});



    /*
    // TAP TEST POSSIBILITIES
      t.equal(thingie, "thing", "thingie should be thing")
      t.deepEqual(array, ["foo", "bar"], "array has foo and bar elements")
      t.deepEqual(object, {foo: 42}, "object has foo property")
      t.type(thingie, "string", "type of thingie is string")
      t.ok(true, "this is always true")
      t.notOk(false, "this is never true")
      t.test("a child test", function (t) {
        t.equal(this, superEasy, "right!?")
        t.similar(7, 2, "ever notice 7 is kinda like 2?", {todo: true})
        t.test("so skippable", {skip: true}, function (t) {
          t.plan(1) // only one test in this block
          t.ok(true, "but when the flag changes, it'll pass")
          // no need to end, since we had a plan.
        })
        endTest(t);
      })
      t.ok(99, "can also skip individual assertions", {skip: true})
      // end lets it know it's over.
      endTest(t);
    })
    test("another one", function (t) {
      t.ok(true, "It's ok to plan, and also end.  Watch.")
      endTest(t);
    })

*/

