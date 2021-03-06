module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    curl: {
      js: {
        src: 'http://cdnjs.cloudflare.com/ajax/libs/labjs/2.0.3/LAB.min.js',
        dest: 'actual/file.js'
      },
      zip: {
        src: 'https://github.com/twitter/bootstrap/blob/91b92f9dd09c1794d02c6157daba5405d8f09e39/assets/bootstrap.zip?raw=true',
        dest: 'actual/file.zip'
      },
      nonExistingDomain: {
        src: 'http://nonexistent--foo--domain',
        dest: 'actual/nonexistent-domain'
      },
      nonExistingFile: {
        src: 'https://github.com/nonexistent--foo--file',
        dest: 'actual/nonexistent-file'
      }
    },
    'curl-dir': {
      multi: {
        src: [
          'http://cdnjs.cloudflare.com/ajax/libs/labjs/2.0.3/LAB.min.js',
          'http://cdnjs.cloudflare.com/ajax/libs/cookiejar/0.5/cookiejar.js'
        ],
        dest: 'actual/multi'
      },
      braceExpansion: {
        src: [
          'http://cdnjs.cloudflare.com/ajax/libs/{labjs/2.0.3/LAB.min,cookiejar/0.5/cookiejar}.js'
        ],
        dest: 'actual/braceExpansion'
      },
      router: {
        src: [
          'http://cdnjs.cloudflare.com/ajax/libs/labjs/2.0.3/LAB.min.js',
          'http://cdnjs.cloudflare.com/ajax/libs/cookiejar/0.5/cookiejar.js'
        ],
        router: function curlDirRouter (url) {
          return url.replace('http://cdnjs.cloudflare.com/', '');
        },
        dest: 'actual/router'
      }
    },
    nodeunit: {
      all: '*_test.js'
    }
  });

  // Go up one directory for proper resolutions
  // TODO: Grunt makes too many assumptions about folder layout =_=
  process.chdir('..');

  // Load in grunt-contrib for testing against
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Come back to test directory
  process.chdir(__dirname);

  // Load local tasks.
  grunt.loadTasks('../tasks');

  // Alias nodeunit as test
  grunt.registerTask('test', ['nodeunit']);

  // Run project task then tests.
  grunt.registerTask('default', ['curl', 'curl-dir', 'test']);
};
