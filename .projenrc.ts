const { AwsCdkConstructLibrary } = require('projen/lib/awscdk');

const project = new AwsCdkConstructLibrary({
  name: '@matthewbonig/sqs-redrive',
  defaultReleaseBranch: 'main',
  authorAddress: 'matthew.bonig@gmail.com',
  authorName: 'Matthew Bonig',
  authorOrganization: true,
  cdkVersion: '2.50.0',
  projenrcTs: true,
  description: "A redrive construct to use with an SQS queue and it's dead letter queue",
  homepage: 'https://github.com/mbonig/sqs-redrive',
  repositoryUrl: 'https://github.com/mbonig/sqs-redrive',
  catalog: {
    announce: true,
    twitter: 'mattbonig',
  },
  keywords: [
    'cdk',
    'sqs',
    'dead-letter-queues',
    'redrive',
  ],
  bin: {
    'sqs-redrive-construct': 'bin/sqs-redrive-construct.js',
  },
  deps: ['@aws-sdk/client-sqs'],
  bundledDeps: ['@aws-sdk/client-sqs'],
  repository: 'https://github.com/mbonig/sqs-redrive',
  license: 'MIT',
  buildWorkflow: true,
  release: true,
  majorVersion: 2,
});

const ignores = ['.idea/', '.parcel-cache/', 'cdk.out/', '.cdk.staging/'];
project.gitignore.exclude(...ignores);
project.npmignore.exclude(...ignores);

project.addFields({
  public: true,
  main: 'lib/sqs-redrive.js',
  types: 'lib/sqs-redrive.d.ts',
});


project.synth();
