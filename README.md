# SQS Redrive   

This construct creates a Lambda function that you can use to move SQS messages from one queue to another. This is often used for moving Dead Letter Queue messages back to the original queue for reprocessing.

# DEPRECATED

AWS recently announced an update to the SQS API that builds a redrive directly into the service:

[https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_StartMessageMoveTask.html](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_StartMessageMoveTask.html)

With this API update, this construct is no longer required and you should stop using it. I will no longer be making any updates to it.


# This is a pre-release!

This is a quick first-draft. All the options that will likely need to be added to accomodate a large
number of use-cases are still needed. If you'd like to make requests or help update this construct, please
open an [Issue](https://github.com/mbonig/cicd-spa-website/issues) or a [PR](https://github.com/mbonig/cicd-spa-website/pulls).


## What Gets Created

A Lambda function and related policy which moves SQS queue messages from one queue to another.

## Example

This creates two external queues and then creates the Lambda to move from the deadLetterQueue to the mainQueue

```typescript
import * as cdk from '@aws-cdk/core';
import {SqsRedrive} from '../lib/sqs-redrive';
import {Queue} from "@aws-cdk/aws-sqs";

const app = new cdk.App();
const stack = new cdk.Stack(app, 'test-stack');

let mainQueue = new Queue(stack, 'main-queue');
let deadLetterQueue = new Queue(stack, 'dlq-queue');
new SqsRedrive(stack, 'SqsRedriveConstructStack', {
    mainQueue: mainQueue,
    deadLetterQueue: deadLetterQueue
});
```

*Note: this is the integration test (`cdk synth`).*

## Input Properties

What are the inputs to your constructs?

|property|description|example
|---|---|---
|mainQueue|The destination queue for the messages.|```new Queue(stack, 'main-queue')```
|deadLetterQueue|The source queue of the messages.|```new Queue(stack, 'dead-letter-queue')```

## Overriding Lambda Props

You can supply your own properties to the Lambda Function constructor. They're mashed together with some defaults. 
Pay attention to the order:

```typescript
this.redriveFunction = new NodejsFunction(this, `${id}-queue-redrive`, {
  functionName: id,
  entry: join(__dirname, 'sqs-redrive.queue-redrive.lambda.ts'),
  ...props.lambdaProps,
  environment: {
    QUEUE_URL: props.mainQueue.queueUrl,
    DLQ_URL: props.deadLetterQueue!.queueUrl,
    ...props?.lambdaProps?.environment,
  },
});
```

`functionName` and `entry` can be overridden. Environment variables will always be splatted with the two queue URLs so
you never have to worry about specifying those (you can, of course, override them, but if you're going that far then
why are you using this construct?).

## Output Properties

After constructed, you can gain access to the Lambda Function:

```typescript
const redrive = new SqsRedrive(stack, 'SqsRedriveConstructStack', {
                    mainQueue: mainQueue,
                    deadLetterQueue: deadLetterQueue
                });

// redrive.redriveFunction is an IFunction 
```

## Design Notes

This is early design and serves one very specific use-case. If you have suggestions on how to make this better, please open an [Issue in Github](https://github.com/mbonig/sqs-redrive/issues).

## Contributing

Please open Pull Requests and Issues on the [Github Repo](https://github.com/mbonig/sqs-redrive).

## License

MIT
