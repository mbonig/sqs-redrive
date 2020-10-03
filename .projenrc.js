const {AwsCdkConstructLibrary} = require('projen');

const project = new AwsCdkConstructLibrary({
    name: "@matthewbonig/sqs-redrive",
    authorAddress: "matthew.bonig@gmail.com",
    authorName: "Matthew Bonig",
    authorOrganization: true,
    cdkVersion: "1.66.0",
    description: "A redrive construct to use with an SQS queue and it's dead letter queue",
    catalog: {
        announce: true,
        twitter: 'mattbonig'
    },
    keywords: [
        "cdk",
        "sqs",
        "dead-letter-queues",
        "redrive"
    ],
    bin: {
        "sqs-redrive-construct": "bin/sqs-redrive-construct.js"
    },
    python: {
        distName: 'mbonig.sqs-redrive',
        module: 'mbonig.sqs_redrive'
    },
    repository: "https://github.com/mbonig/sqs-redrive",
    license: "MIT",
    buildWorkflow: false,
    releaseWorkflow: false
});

project.gitignore.exclude(".idea/", ".parcel-cache/");
project.addCdkDependencies("@aws-cdk/aws-lambda",
    "@aws-cdk/aws-lambda-nodejs",
    "@aws-cdk/aws-sqs",
    "@aws-cdk/core"
);

project.addFields({
    "public": true,
    "main": "lib/sqs-redrive.js",
    "types": "lib/sqs-redrive.d.ts"
});


project.synth();
