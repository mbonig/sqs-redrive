import {Construct} from "@aws-cdk/core";
import {NodejsFunction, NodejsFunctionProps} from "@aws-cdk/aws-lambda-nodejs";
import {IQueue} from "@aws-cdk/aws-sqs";

export interface SqsRedriveProps {
    readonly deadLetterQueue: IQueue;
    readonly mainQueue: IQueue;
    readonly lambdaProps?: NodejsFunctionProps
}

export class SqsRedrive extends Construct {

    constructor(scope: Construct, id: string, props: SqsRedriveProps) {
        super(scope, id);

        const lambda = new NodejsFunction(this, 'queue-redrive', {
            functionName: id,
            ...props.lambdaProps,
            environment: {
                QUEUE_URL: props.mainQueue.queueUrl,
                DLQ_URL: props.deadLetterQueue!.queueUrl,
                ...props?.lambdaProps?.environment
            }
        });

        props.deadLetterQueue.grantConsumeMessages(lambda);
        props.mainQueue.grantSendMessages(lambda);

    }
}
