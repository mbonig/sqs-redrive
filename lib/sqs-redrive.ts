import {Construct} from "@aws-cdk/core";
import {NodejsFunction, NodejsFunctionProps} from "@aws-cdk/aws-lambda-nodejs";
import {IQueue} from "@aws-cdk/aws-sqs";

interface SqsRedriveProps {
    DeadLetterQueue: IQueue;
    MainQueue: IQueue;
    LambdaProps?: NodejsFunctionProps
}

export class SqsRedrive extends Construct {

    constructor(scope: Construct, id: string, props: SqsRedriveProps) {
        super(scope, id);

        const lambda = new NodejsFunction(this, 'queue-redrive', {
            functionName: id,
            ...props.LambdaProps,
            environment: {
                QUEUE_URL: props.MainQueue.queueUrl,
                DLQ_URL: props.DeadLetterQueue!.queueUrl,
                ...props?.LambdaProps?.environment
            }
        });

        props.DeadLetterQueue.grantConsumeMessages(lambda);
        props.MainQueue.grantSendMessages(lambda);

    }
}
