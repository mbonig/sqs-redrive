#!/usr/bin/env node
import 'source-map-support/register';
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
