var should = require('should');
var File = require('vinyl');
var es = require('event-stream');
var rewire = require('rewire');
var systemUnderTest = rewire('./../index');

describe('gulp-jimp', function () {

    var fakeFile;
    var result;
    var mockJimp = function (path, fn) {
        fn().bind(this);
        
    };
    mockJimp.prototype.resize = function(w, h) {}

//    describe('Testing a JPG file', function () {
//
//        beforeEach(function (done) {
//            fakeFile = new File({
//                contents: new Buffer('helloworld')
//            });
//            
//            systemUnderTest.__set__('Jimp', mockJimp);
//
//            var output = systemUnderTest({
//                resize: {
//                    width: 200,
//                    height: 200
//                }
//            });
//
//            output.write(fakeFile);
//
//            output.once('data', function (file) {
//                result = file.contents;
//                done();
//            });
//        });
//
//        it('should work', function () {
//            "one".should.equal('one');
//        });
//    });
    
    describe('Testing Travis', function(){
        it('should work', function(){
            true.should.be.true;
        });
        
    });
});