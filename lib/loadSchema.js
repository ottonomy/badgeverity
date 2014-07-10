const crypto = require('crypto');

/* Schema objects are stored in the database as JSON documents with a little metadata

{
	"slug": "string",
	"hash": "alg$hash"
	"schema": { schema object }
}
*/


/*================================== 
    Loading Schema from Database 
==================================*/ 


//find a schema-wrapping object in the database by reference slug. Callback is fn(err, docs)
function findSchemaObject(reference, collection, callback) {;
	collection.find( {slug: reference}, callback);
}

//store a schema-wrapping object in database. Callback is function(err, doc)
function storeSchemaObject(reference, schema, collection, callback){
	if (!validateSchema(schema)) {
			callback(new Error("schema object didn't validate. Can't store."), null);
			return;
		}
	findSchemaObject(reference, collection, function (findErr, findResults){
		if (findErr){
				callback(findErr, findResults);
				return;
			}
		if (typeof findResults == "array" && results.length > 0){
				callback(new Error("A schema already exists with that slug reference."),findResults);
				return;
			}
		else {
			// We can now write the new schema to the database, wrapped in an object containing the reference.
			var builtSchema = {
				slug: reference,
				hash: hashSchema(schema),
				schema: schema
			}

			collection.insert(builtSchema, callback);
		}
	});
}

// callback is (err, schema)
function retrieveSchemaByReference(reference, collection, callback){
	if (validateReference(reference)) {
		findSchemaObject(reference, collection, function (err, doc){
			actualSchemaJSON = doc[0].schema;
			if (!err && actualSchemaJSON)
				callback(err, actualSchemaJSON);
			else
				callback(err,doc);
		});
	}
}

// callback(err, schema)
function retrieveSchemaByHash(hash, collection, callback){
	callback(new Error("not implemented error - retrieveSchemaByHash"), null);
}


/*================ 
    UTILITIES 
================*/ 


//ensure what made it into storage is a valid schema
function validateSchema(schema){
	return true;
}

function hashSchema(schema){
	return "somehash";
}

function validateReference(reference){
	if (typeof reference == "string"){ 
		return true;
	}
	else
		return false;
}











module.exports.storeSchemaObject = storeSchemaObject;
module.exports.findSchemaObject = findSchemaObject;
module.exports.retrieveSchemaByReference = retrieveSchemaByReference;
module.exports.retrieveSchemaByHash = retrieveSchemaByHash;


