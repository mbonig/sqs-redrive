import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import SqsRedriveConstruct = require('../lib/sqs-redrive-construct-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SqsRedriveConstruct.SqsRedriveConstructStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
