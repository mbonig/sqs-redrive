import { App, Duration, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { SqsRedrive } from '../src/sqs-redrive';

describe('lambda', () => {


  test('Lambda exists', () => {
    const app = new App();
    // WHEN

    const testStack = new Stack(app, 'test-stack');
    let mainQueue = new Queue(testStack, 'main-queue');
    let deadLetterQueue = new Queue(testStack, 'dlq-queue');

    new SqsRedrive(testStack, 'test-construct', { mainQueue: mainQueue, deadLetterQueue: deadLetterQueue });

    // THEN
    const assert = Template.fromStack(testStack);
    assert.hasResourceProperties('AWS::Lambda::Function', {
      Environment: {
        Variables: {
          QUEUE_URL: {
            Ref: 'mainqueue22B84331',
          },
          DLQ_URL: {
            Ref: 'dlqqueueCA39622D',
          },
        },
      },
    });
  });


  test('Lambda has right policy to read/write queues', () => {
    const app = new App();
    // WHEN

    const testStack = new Stack(app, 'test-stack');
    let mainQueue = new Queue(testStack, 'main-queue');
    let deadLetterQueue = new Queue(testStack, 'dlq-queue');

    new SqsRedrive(testStack, 'test-construct', { mainQueue: mainQueue, deadLetterQueue: deadLetterQueue });
    // THEN

    const assert = Template.fromStack(testStack);
    assert.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: [
          {
            Action: [
              'sqs:ReceiveMessage',
              'sqs:ChangeMessageVisibility',
              'sqs:GetQueueUrl',
              'sqs:DeleteMessage',
              'sqs:GetQueueAttributes',
            ],
            Effect: 'Allow',
            Resource: {
              'Fn::GetAtt': [
                'dlqqueueCA39622D',
                'Arn',
              ],
            },
          },
          {
            Action: [
              'sqs:SendMessage',
              'sqs:GetQueueAttributes',
              'sqs:GetQueueUrl',
            ],
            Effect: 'Allow',
            Resource: {
              'Fn::GetAtt': [
                'mainqueue22B84331',
                'Arn',
              ],
            },
          },
        ],
        Version: '2012-10-17',
      },
      PolicyName: 'testconstructtestconstructqueueredriveServiceRoleDefaultPolicyC35BE985',
      Roles: [
        {
          Ref: 'testconstructtestconstructqueueredriveServiceRole939AEEB0',
        },
      ],
    });
  });

  test('Lambda uses passed props', () => {
    const app = new App();
    // WHEN

    const testStack = new Stack(app, 'test-stack');
    let mainQueue = new Queue(testStack, 'main-queue');
    let deadLetterQueue = new Queue(testStack, 'dlq-queue');

    new SqsRedrive(testStack, 'test-construct', {
      mainQueue: mainQueue,
      deadLetterQueue: deadLetterQueue,
      lambdaProps: {
        functionName: 'my-own-function-name',
        environment: {
          should: 'exist',
        },
        timeout: Duration.minutes(1),
      },
    });
    // THEN

    const assert = Template.fromStack(testStack);
    assert.hasResourceProperties('AWS::Lambda::Function', {
      Environment: {
        Variables: {
          QUEUE_URL: {
            Ref: 'mainqueue22B84331',
          },
          DLQ_URL: {
            Ref: 'dlqqueueCA39622D',
          },
          should: 'exist',
        },
      },
      FunctionName: 'my-own-function-name',
      Timeout: 60,
    });
  });
});
