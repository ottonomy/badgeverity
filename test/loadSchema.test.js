const test = require('tap').test;
const ls = require('../lib/loadSchema.js');
const monk = require("monk");


test("Get schema definition from preloadedSchema by reference",function(t){
	t.plan(10);

	db = monk('localhost/badgeveritytest');
	t.ok(typeof db !== undefined, "db should not be undefined after declaring it.");

	schemaStorage = db.get('schema');

	// give a URL to readSchemaFilepath to make sure good result or right error is returned
	ls.storeSchema("justastring",'{"type":"string"}', db, function(err, data){
		t.equal(err,null, "Calling storeSchema properly should not yield an error of any type.")

		//test return data to make sure it's our object
		t.type(data, "object", "A proper call to storeSchema should return an object.");
		t.equal(data.slug, "justastring", "A proper call to storeSchema should return an object with a slug of the reference we passed in.");

		try to find our object again and make sure it's the one!
		ls.findSchema("justastring",db,function(err, data){
			t.equal(err,null, "Searching for our schema should not yield an error");
			t.type(data,"object","We should get an object back when we search for the schema we stored");

			t.equal(data, {silly: true,}, "findSchema should return an object");
			// It seems we get an object back when there is only one result returned.

			t.equal(data["slug"], "justastring", "The single object returned with a search for our schema slug should contain our schema slug.");

			//remove the schema and make sure it's gone.
			schemaStorage.remove({},function(err,data){
				ls.findSchema("justastring",db,function(err, data){
					t.equal(data.length, 0, "After we attempt to remove all stored schema from the test database, we should not be able to find the schema we had added.");
				});
			});
		});
	});
});

// const library = require('../badge-schema-library');
// test('Make sure poorly formed options return nothing', function(t){
// 	t.equal(library.find("string"),undefined,"Should reject options if it's not an object");
// 	t.equal(library.find({}),undefined,"Should reject empty options object");
// 	t.equal(library.find({"reference":"http://example.com"}),undefined,"Should return undefined for opts without checksum");
// 	t.end();
// });

// test('Make sure it can find schema by the hash',function(t){
// 	t.equal(typeof library.find({"checksum":"sha1$8e33486f9614881ec984f0346a6eec1aa13f5ad5"}),'object',"Should return an object for a correct hash");
// 	t.equal(library.find({"checksum":"sha1$stinky"}),undefined,"Should return undefined for a faulty hash");
// 	t.end();
// });