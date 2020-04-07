#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SqsRedriveConstructStack } from '../lib/sqs-redrive-construct-stack';

const app = new cdk.App();
new SqsRedriveConstructStack(app, 'SqsRedriveConstructStack');
