const preloadedSchema = {
	'ageTarget':'/Users/nate/www/badgeverity/testfiles/schema-age-target-v0.5.json',
	'badgeClass': '../testfiles/badgeClass.json'
};

const ls = require('./lib/loadSchema');
ls.setStorage(preloadedSchema);

function getSchema(identifier, callback){
	console.log("In Index.js - Trying to load schema: " + identifier);
	var result; 
	ls.loadSchema(identifier,function(err, data){
		if (err)
			callback(err);
		else {
			console.log("In Index.js callback - found schema of type " + typeof foundSchema); 
			callback(null, foundSchema);
		}
	});
}



module.exports.getSchema = getSchema;