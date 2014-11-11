var should = require('should');
var File = require('vinyl');
var es = require('event-stream');
var rewire = require('rewire');
var systemUnderTest = rewire('./../index');

describe('gulp-jimp', function () {

    var fakeFile;
    var result;
    var mockJimp = function (path, fn) {
        fn.bind(this)();

    };
    mockJimp.prototype.resize = function (w, h) {}
    mockJimp.prototype.write = function (file, fn) {
        fn.bind(this)();
    }

    var mockFs = {
        readFileSync: function (file, opts, cb) {
            cb(null, 'changedContent');
        },
        unlink: function (file, cb) {
            cb(null);
        }
    }

    systemUnderTest.__set__('Jimp', mockJimp);
    systemUnderTest.__set__('fs', mockFs);


    describe('Testing a JPG file', function () {

        beforeEach(function (done) {
            fakeFile = new File({
                contents: new Buffer('originalContent')
            });


            var output = systemUnderTest({
                resize: {
                    width: 200,
                    height: 200
                }
            });

            output.write(fakeFile);

            output.once('data', function (file) {
                result = file.contents.toString();
                done();
            });
        });

        it('should have replaced the file content by the content of the one modified by Jimp', function () {
            result.should.equal('changedContent');
        });
    });
});