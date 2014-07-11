const oven = require('openbadges-bakery');
const fs = require('fs');

var thejson = {"uid":"198001222fc99c49bb86607de9e2504d585746a0","recipient":{"type":"email","hashed":true,"salt":"kosha","identity":"sha256$a20a52da552b1b130e95d4d0b8b6bbd1ce88bbf3f4ce94f1a9ff349d1f1ccef6"},"badge":{"name":"Open edX Contributor","description":"This badge is awarded for contributions to the Open edX codebase, typically through an accepted pull request on GitHub. Earners of this badge tend to be public-spirited hackers willing to dig into a complex codebase. They know their way around version control and participation in open source communities.","image":"http://fierce-ridge-5067.herokuapp.com//images/badge/21","criteria":"http://fierce-ridge-5067.herokuapp.com//system/good/badge/open-edx-contributor/criteria","issuer":{"name":"good","url":"http://example.com/nice","description":"yup good","_location":"http://young-basin-5816.herokuapp.com/public/systems/good","origin":"http://example.com"},"_location":"http://young-basin-5816.herokuapp.com/public/systems/good/badges/open-edx-contributor"},"verify":{"url":"http://young-basin-5816.herokuapp.com/public/assertions/198001222fc99c49bb86607de9e2504d585746a0","type":"hosted"},"issuedOn":1399399583,"_originalRecipient":{"identity":"sha256$356e4c51f2ea47db376926d44c8a47ba91064239c737c92a4acff629c52edd17","type":"email","hashed":true},"issued_on":1399399583};
var inputFile = fs.readFileSync('./test/testfiles/dddd.png');
var outputPath = './test/testfiles/test.png';

function bakeImage(inputImg, assertionToBake, outputFilename,)
oven.bake({image: inputImg, assertion: thejson}, function(err, imageData){
	if (!err) {
		fs.writeFileSync(outputFilename,imageData);
		console.log("we think it is a success.");
	}
	else {
		console.log("we think it is a failure")
		console.log(err);
	}
});

// bakeImage(inputFile,thejson,outputPath);