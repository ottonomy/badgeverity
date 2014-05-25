const fs = require('fs');

const preloadedSchema = {
	'ageTarget':'/Users/nate/www/badgeverity/testfiles/schema-age-target-v0.5.json'
};

function readSchemaFile(identifier, callback) {
	console.log("trying to load schema for identifier: " + identifier);
	var filepath = preloadedSchema[identifier];

	if (typeof filepath === "string"){
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
	else {
		callback(new Error("No schema was found to match provided identifier"));
	}
	
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




module.exports = loadSchema;