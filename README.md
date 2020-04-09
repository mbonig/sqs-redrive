# SQS Redrive   

This construct creates a Lambda function that you can use to move SQS messages from one queue to another. This is often used for moving Dead Letter Queue messages back to the original queue for reprocessing.

# This is a pre-release!

This is a quick first-draft. All the options that will likely need to be added to accomodate a large
number of use-cases are still needed. If you'd like to make requests or help update this construct, please
open an [Issue](https://github.com/mbonig/cicd-spa-website/issues) or a [PR](https://github.com/mbonig/cicd-spa-website/pulls).


## What Gets Created

A Lambda function and related policy which moves SQS queue messages from one queue to another.

## Example

This creates two external queues and then creates the Lambda to move from the DeadLetterQueue to the MainQueue

```typescript
import * as cdk from '@aws-cdk/core';
import {SqsRedrive} from '../lib/sqs-redrive';
import {Queue} from "@aws-cdk/aws-sqs";

const app = new cdk.App();
const stack = new cdk.Stack(app, 'test-stack');

let mainQueue = new Queue(stack, 'main-queue');
let deadLetterQueue = new Queue(stack, 'dlq-queue');
new SqsRedrive(stack, 'SqsRedriveConstructStack', {
    MainQueue: mainQueue,
    DeadLetterQueue: deadLetterQueue
});
```

*Note: this is the integration test (`cdk synth`).*

## Input Properties

What are the inputs to your constructs?

|property|description|example
|---|---|---
|MainQueue|The destination queue for the messages.|```new Queue(stack, 'main-queue')```
|DeadLetterQueue|The source queue of the messages.|```new Queue(stack, 'dead-letter-queue')```

## Design Notes

This is early design and serves one very specific use-case. If you have suggestions on how to make this better, please open an [Issue in Github](https://github.com/mbonig/sqs-redrive/issues).

## Contributing

Please open Pull Requests and Issues on the [Github Repo](https://github.com/mbonig/sqs-redrive).

## License

MIT
