const fs = require('fs');
const monk = require('monk');


/* Schemas objects are stored in the database as JSON documents with a little metadata

{
	"slug": "string",
	"hash": "alg$hash"
	"schema": { schema object }
}
*/



//find a schema in the database by reference slug
function findSchema(reference,db,callback) {
	schemaStorage = db.get('schema');
	schemaStorage.find( {slug: reference}, function (err, docs) {
		if(err)
			callback(err,docs);
		else
			callback(null,docs);
	});
}

//store a schema in database
function storeSchema(reference,schema,db,callback){
	if (!validateSchema(schema)) {
			callback(new Error("schema object didn't validate. Can't store."));
			return;
		}
	findSchema(reference,db,function(err,results){
		if (err){
				callback(err,results);
				return;
			}
		if (typeof results == "array" && results.length > 0){
				callback(new Error("A schema already exists with that slug reference."),results);
				return;
			}
		else {
			schemaStorage = db.get('schema');

			builtSchema = new Object();
			builtSchema.slug = reference;
			builtSchema.hash = "blargh";
			builtSchema.schema = schema;


			schemaStorage.insert(builtSchema, function (err, doc) {
				if(err) {
					callback(err);
					return;
				}
				else
					callback(null,doc);
			});
			
		}
	});
}

//ensure what made it into storage is a valid schema
function validateSchema(schema){
	return true;
}

//instantiate default values
function Storage(){
	this.ageTarget = '/Users/nate/www/badgeverity/testfiles/schema-age-target-v0.5.json';
	this.badgeClass = '../testfiles/badgeClass.json';
}
var storage = new Storage();

function setStorage(storageSuggestion, callback) {
	if (typeof storageSuggestion === "object") {
		for (var schema in storageSuggestion) {
			storage[schema]=storageSuggestion[schema];
		}
		callback(null, storage);
	}
	else
		callback(new Error('New schema reference invalid format. {"name":"url"} expected'));
}



function validateFilePath(identifier, callback){
	// load preloadedResult from schema storage
	filepath = storage[identifier];

	//validate result
	if (typeof filepath === "string"){
		callback(null, filepath);
	}
	else {
		callback(new Error("File path from schema storage was not a string)"), filepath);
	}
}


function readSchemaFile(identifier, callback) {
	console.log("trying to load schema for identifier: " + identifier);
	validateFilePath(identifier, function(err, filepath){
		if (err) {
			callback(err, filepath);
		}
		else {
			console.log("reading schema file " + filepath);
			fs.readFile(filepath,'UTF-8',function(err, data){
				if (err) {
					callback(err);
					return;
				}
				console.log("No errors: now completed reading schema file " + filepath);
				callback(null, data);
			});
		}
	});
	
}



function loadSchema(identifier, callback) {
	console.log("trying to loadSchema: " + identifier);
	readSchemaFile(identifier, function(err, data){
		if (err)
			callback(err);
		else
			callback(data);
	});	
}





module.exports.storeSchema = storeSchema;
module.exports.findSchema = findSchema;