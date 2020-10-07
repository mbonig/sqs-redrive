import { join } from 'path';
import { IFunction } from '@aws-cdk/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from '@aws-cdk/aws-lambda-nodejs';
import { IQueue } from '@aws-cdk/aws-sqs';
import { Construct } from '@aws-cdk/core';

/**
 * Props for the SqsRedrive construct creation
 */
export interface SqsRedriveProps {
  /**
   * The SQS Queue that holds dead-letters.
   */
  readonly deadLetterQueue: IQueue;
  /**
   * The SQS Queue that will re-process the DLQ messages.
   */
  readonly mainQueue: IQueue;
  /**
   * Props to hand to the underlying Lambda Function that does all the heavy lifting
   *
   * Code originally lifted from here: https://www.stackery.io/blog/failed-sqs-messages/
   * */
  readonly lambdaProps?: NodejsFunctionProps;
}

/**
 * A construct that encompasses a Lambda Function that will move all messages from a source queue (dlq) to a destination
 * queue (main).
 */
export class SqsRedrive extends Construct {
  /**
   * The Lambda Function that will move messages from the DLQ to the main queue.
   */
  public redriveFunction: IFunction;

  constructor(scope: Construct, id: string, props: SqsRedriveProps) {
    super(scope, id);

    this.redriveFunction = new NodejsFunction(this, `${id}-queue-redrive`, {
      functionName: id,
      entry: join(__dirname, 'sqs-redrive.queue-redrive.ts'),
      ...props.lambdaProps,
      environment: {
        QUEUE_URL: props.mainQueue.queueUrl,
        DLQ_URL: props.deadLetterQueue!.queueUrl,
        ...props?.lambdaProps?.environment,
      },

    });

    props.deadLetterQueue.grantConsumeMessages(this.redriveFunction);
    props.mainQueue.grantSendMessages(this.redriveFunction);

  }
}
