import {Construct} from "@aws-cdk/core";
import {NodejsFunction} from "@aws-cdk/aws-lambda-nodejs";
import {IQueue} from "@aws-cdk/aws-sqs";

interface SqsRedriveProps {
    DeadLetterQueue?: IQueue;
    MainQueue: IQueue;
}

export class SqsRedrive extends Construct {

    constructor(scope: Construct, id: string, props: SqsRedriveProps) {
        super(scope, id);

        const lambda = new NodejsFunction(this, 'queue-redrive', {
            functionName: id,
            environment: {
                QUEUE_URL: props.MainQueue.queueUrl,
                DLQ_URL: props.DeadLetterQueue!.queueUrl
            }
        });

        props.DeadLetterQueue!.grantConsumeMessages(lambda);
        props.MainQueue.grantSendMessages(lambda);

    }
}
