const aws = require('aws-sdk');
const sqs = new aws.SQS();

export const handler = async (event: any) => {

    // Log the event argument for debugging and for use in local development.

    console.log(JSON.stringify(event, undefined, 2));

    while (true) {

        try {

            // Use long polling to avoid empty message responses

            const receiveParams = {

                QueueUrl: process.env.DLQ_URL,

                MaxNumberOfMessages: 10,

                WaitTimeSeconds: 1

            };

            // Get messages from the DLQ

            // Continue looping until no more messages are left

            const DLQMessages = await sqs.receiveMessage(receiveParams).promise();

            if (!DLQMessages.Messages || DLQMessages.Messages.length === 0) {

                console.log(`NO MESSAGES FOUND IN ${process.env.DLQ_URL}`);

                // Exit the loop since there aren't any messages left

                break;

            }

            console.log(`RECEIVED ${DLQMessages.Messages.length} MESSAGES`);

            for (const message of DLQMessages.Messages) {

                // Send message to original queue

                const outboundMessage = {

                    MessageBody: message.Body,

                    QueueUrl: process.env.QUEUE_URL

                };

                console.log(`SENDING: ${JSON.stringify(outboundMessage, null, 2)}`);

                await sqs.sendMessage(outboundMessage).promise();

                console.log('SEND MESSAGE SUCCEEDED');

                // Delete message from DLQ

                const deleteParams = {

                    QueueUrl: process.env.DLQ_URL,

                    ReceiptHandle: message.ReceiptHandle

                };

                console.log(`DELETING: ${JSON.stringify(deleteParams, null, 2)}`);

                await sqs.deleteMessage(deleteParams).promise();

                console.log('DELETE MESSAGE SUCCEEDED');

            }

        } catch (err) {

            console.log(`AN ERROR OCCURRED: ${err.message}`);

            console.log(JSON.stringify(err, null, 2));

            throw err;

        }

    }

};
