const {AwsCdkConstructLibrary} = require('projen');

const project = new AwsCdkConstructLibrary({
  name: "@matthewbonig/sqs-redrive",
  authorAddress: "matthew.bonig@gmail.com",
  authorName: "Matthew Bonig",
  authorOrganization: true,
  cdkVersion: "1.75.0",
  description: "A redrive construct to use with an SQS queue and it's dead letter queue",
  catalog: {
    announce: true,
    twitter: 'mattbonig'
  },
  devDeps: [
    "parcel",
    "yarn",
    "esbuild"
  ],
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

const ignores = [".idea/", ".parcel-cache/", "cdk.out/", ".cdk.staging/"];
project.gitignore.exclude(...ignores);
project.npmignore.exclude(...ignores);
project.addCdkDependencies(
  "@aws-cdk/aws-lambda",
  "@aws-cdk/aws-lambda-nodejs",
  "@aws-cdk/aws-sqs",
  "@aws-cdk/core"
);

project.addFields({
  "public": true,
  "main": "lib/sqs-redrive.js",
  "types": "lib/sqs-redrive.d.ts"
});

project.addScript("compile", "jsii --silence-warnings=reserved-word --no-fix-peer-dependencies && jsii-docgen && cp ./src/sqs-redrive.queue-redrive.ts ./lib")

project.synth();
