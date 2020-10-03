const {AwsCdkConstructLibrary} = require('projen');

let cdkVersion = "1.66.0";
let dependencies = {
    "@aws-cdk/aws-lambda": cdkVersion,
    "@aws-cdk/aws-lambda-nodejs": cdkVersion,
    "@aws-cdk/aws-sqs": cdkVersion,
    "@aws-cdk/core": cdkVersion
};
const project = new AwsCdkConstructLibrary({
    authorAddress: "matthew.bonig@gmail.com",
    authorName: "Matthew Bonig",
    authorOrganization: true,
    catalog: {
        announce: true,
        twitter: 'mattbonig'
    },
    license: "MIT",
    keywords: [
        "cdk",
        "sqs",
        "dead-letter-queues",
        "redrive"
    ],
    description: "A redrive construct to use with an SQS queue and it's dead letter queue",
    dependencies: dependencies,
    peerDependencies: dependencies,
    cdkVersion: cdkVersion,
    bin: {
        "sqs-redrive-construct": "bin/sqs-redrive-construct.js"
    },
    python: {
        distName: 'mbonig.sqs-redrive',
        module: 'mbonig.sqs_redrive'
    },
    name: "@matthewbonig/sqs-redrive",
    repository: "https://github.com/mbonig/sqs-redrive"
});

project.gitignore.exclude(".idea/");

project.addFields({
    "public": true,
    "main": "lib/sqs-redrive.js",
    "types": "lib/sqs-redrive.d.ts"
});

project.synth();
