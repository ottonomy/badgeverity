const loadSchema = require('./lib/loadSchema');

function getSchema(identifier, callback){
	console.log("In Index.js - Trying to load schema: " + identifier);
	var result; 
	loadSchema(identifier,function(err, data){
		if (err)
			callback(err);
		else {
			console.log("In Index.js callback - found schema of type " + typeof foundSchema); 
			callback(null, foundSchema);
		}
	});
}



module.exports.getSchema = getSchema;