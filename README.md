## Documentation for Badge Verity

Badge Verity is a utility to perform several tasks related to validating [OBI Open Badges](http://openbadges.org), particularly:
* Testing whether a badgeClass is a valid instance of an OBI badgeClass, obeying the OBI standard, as defined in JSON-schema
* Testing the properties of badgeClass instances to ensure they are well-formed against JSON-schemas specific to their type.
* Allows the addition of additional rules for extension properties in the form of schemas in a datastore or file. (This feature is not yet implemented here or in the Open Badges Standard)

### Requirements
Badgeverity uses Mongo DB to store schemas. Make sure it's running on localhost and doesn't require auth so far, because I haven't enabled any configuration options outside of source.

### Notes
This software will eventually be easily incorporated within other Node.js apps that want to verify whether Open Badges are well formedI plan to make it learn to collect and store badge schemas encountered as it processes new extended badge objects. You can add new schemas that define rules your badge objects must obey and write tests to see if things pass these rules. 

## Requests for Help
I'd particularly like review of my JSON-schema definition of the Open Badge Assertion. It attempts to be elegantly structured, but ends up with some duplication. I'm not at all sure how good my JavaScript RegExps are especially!

I will accept pull requests of new code or tests, especially if they show how my [standard.json draft schema](https://github.com/ottonomy/badgeverity/blob/master/test/testfiles/standard.json) is failing on valid badges.

### License
The MIT License (MIT)

Copyright (c) 2014 Nate Otto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
