module.exports = function(grunt) {

  grunt.initConfig({
    lambda_invoke: {
        default: {
            options: {
                // Task-specific options go here.
            }
        }
    },


    lambda_package: {
        default: {
            options: {
                // Task-specific options go here. 
            }
        }
    },


    lambda_deploy: {
        default: {
            arn: 'arn:aws:lambda:us-east-1:858664396059:function:getAppliance',
            options: {
                // Task-specific options go here.
                region: 'us-east-1',
                timeout: 20,
                memory: 128,
            }
        }
    },


    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        // src: ['test.js']
      }
    },



  });


// Default task(s).
grunt.registerTask('default', ['lambda_invoke']);
grunt.registerTask('test', ['mochaTest']);
grunt.registerTask('package', ['mochaTest', 'lambda_package']);
grunt.registerTask('deploy', ['mochaTest', 'lambda_package', 'lambda_deploy']);


grunt.loadNpmTasks('grunt-aws-lambda');
grunt.loadNpmTasks('grunt-mocha-test');



};