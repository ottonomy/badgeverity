// const monk = require('monk');
//const crypto = require('crypto');
const jayschema = require('jayschema');
js = new jayschema;

//designed to be passed JSON objects (not strings) as subject and schema
function validateBadgeObject(subject, schema) {
	return js.validate(subject, schema);
}




module.exports.validateBadgeObject = validateBadgeObject;



