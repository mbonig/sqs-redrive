import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import {Duration} from '@aws-cdk/core';
import {SqsRedrive} from "../lib/sqs-redrive";
import {Queue} from "@aws-cdk/aws-sqs";

test('Lambda exists', () => {
    const app = new cdk.App();
    // WHEN

    const testStack = new cdk.Stack(app, 'test-stack');
    let mainQueue = new Queue(testStack, 'main-queue');
    let deadLetterQueue = new Queue(testStack, 'dlq-queue');

    new SqsRedrive(testStack, 'test-construct', {MainQueue: mainQueue, DeadLetterQueue: deadLetterQueue});
    // THEN

    expect(testStack).toHaveResource('AWS::Lambda::Function', {
        "Environment": {
            "Variables": {
                "QUEUE_URL": {
                    "Ref": "mainqueue22B84331"
                },
                "DLQ_URL": {
                    "Ref": "dlqqueueCA39622D"
                }
            }
        }
    });
});

test('Lambda has right policy to read/write queues', () => {
    const app = new cdk.App();
    // WHEN

    const testStack = new cdk.Stack(app, 'test-stack');
    let mainQueue = new Queue(testStack, 'main-queue');
    let deadLetterQueue = new Queue(testStack, 'dlq-queue');

    new SqsRedrive(testStack, 'test-construct', {MainQueue: mainQueue, DeadLetterQueue: deadLetterQueue});
    // THEN

    expect(testStack).toHaveResource('AWS::IAM::Policy', {
        "PolicyDocument": {
            "Statement": [
                {
                    "Action": [
                        "sqs:ReceiveMessage",
                        "sqs:ChangeMessageVisibility",
                        "sqs:GetQueueUrl",
                        "sqs:DeleteMessage",
                        "sqs:GetQueueAttributes"
                    ],
                    "Effect": "Allow",
                    "Resource": {
                        "Fn::GetAtt": [
                            "dlqqueueCA39622D",
                            "Arn"
                        ]
                    }
                },
                {
                    "Action": [
                        "sqs:SendMessage",
                        "sqs:GetQueueAttributes",
                        "sqs:GetQueueUrl"
                    ],
                    "Effect": "Allow",
                    "Resource": {
                        "Fn::GetAtt": [
                            "mainqueue22B84331",
                            "Arn"
                        ]
                    }
                }
            ],
            "Version": "2012-10-17"
        },
        "PolicyName": "testconstructqueueredriveServiceRoleDefaultPolicy98866D28",
        "Roles": [
            {
                "Ref": "testconstructqueueredriveServiceRoleED9534B0"
            }
        ]
    });
});

test('Lambda uses passed props', () => {
    const app = new cdk.App();
    // WHEN

    const testStack = new cdk.Stack(app, 'test-stack');
    let mainQueue = new Queue(testStack, 'main-queue');
    let deadLetterQueue = new Queue(testStack, 'dlq-queue');

    new SqsRedrive(testStack, 'test-construct', {
        MainQueue: mainQueue, DeadLetterQueue: deadLetterQueue, LambdaProps: {
            functionName: 'my-own-function-name',
            environment: {
                should: 'exist'
            },
            timeout: Duration.minutes(1)
        }
    });
    // THEN

    expect(testStack).toHaveResource('AWS::Lambda::Function', {
        "Environment": {
            "Variables": {
                "QUEUE_URL": {
                    "Ref": "mainqueue22B84331"
                },
                "DLQ_URL": {
                    "Ref": "dlqqueueCA39622D"
                },
                "should": "exist"
            }
        },
        "FunctionName": "my-own-function-name",
        "Timeout": 60
    });
});
