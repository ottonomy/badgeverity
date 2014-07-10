const test = require('tap').test;
const ls = require('../lib/loadSchema.js');
var monk = require('monk');
var db = monk('localhost/badgeveritytest');
var numTests = 0;

function endTest(t){
	t.end();
	numTests += 1;
	if (numTests === 3)
		db.close();
} 


test("Read a schema: look it up by identifier, retrieve wrapper object", function (t){
	var schemaCollection = db.get('schematoread');
	//set up database, add something.
	schemaCollection.insert({ slug: 'b' }, function (err, doc) {
		t.equal(err,null, "There should be no error inserting something.");
		t.type(doc, "object","insert should return an object");
		
		// (reference, collection, callback) 
  		ls.findSchemaObject('b',schemaCollection,function (err, doc){
  		 	t.equal(err,null, "There should be no error asking findSchemaObject for what we just input.");
  		 	t.type(doc,"object","findSchemaObject should return an object");

  		 	t.equal(doc[0].slug,"b", "The single object returned with a search for our schema slug should contain our schema slug.");

  		 	schemaCollection.drop(function (err, doc) {
  		 		endTest(t);
  		 	});
  		 	
  		 });

	});

});


test("Store a schema: look it up by identifier, retrieve wrapperobject", function (t){
	var schemaCollection = db.get('schematowrite');
	//set up database, add something.

	ls.storeSchemaObject("b",{somekey:"text"},schemaCollection, function (err,doc){
		t.equal(err,null, "storeSchemaObject: There should be no error inserting something.");
		if(err) 
			endTest(t);
		//t.type(doc, "object","insert should return an object");
		

  		 ls.findSchemaObject('b',schemaCollection,function (err, doc){
  		 	t.equal(err,null, "There should be no error asking findSchemaObject for what we just input.");
  		 	t.type(doc,"object","findSchemaObject should return an object");

  		 	t.equal(doc[0].slug,"b", "The single object returned with a search for our schema slug should contain our schema slug.");

  		 	schemaCollection.drop(function (err, doc) {
  		 		endTest(t);
  		 	}); 	
  		});
	});
});


test("Read a schema: look it up by identifier, retrieve actual schema", function (t){
	var schemaCollection = db.get('schematoreadschema');
	//set up database, add something.
	ls.storeSchemaObject("b",{somekey: "text", anotherprop: "what"},schemaCollection, function (err,doc) {
		t.equal(err,null, "There should be no error inserting something.");
		t.type(doc, "object","insert should return an object");
		
		// (reference, collection, callback) 
  		ls.retrieveSchemaByReference('b',schemaCollection,function (err, doc){
  		 	t.equal(err,null, "There should be no error asking findSchemaObject for what we just input.");
  		 	t.type(doc,"object","findSchemaObject should return an object");

  		 	t.deepEqual(doc,{anotherprop: "what", somekey: "text"}, "We should get an actual JSON Schema.");

  		 	schemaCollection.drop(function (err, doc) {
  		 		endTest(t);
  		 	});
  		 	
  		 });

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

