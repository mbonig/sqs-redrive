"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@aws-cdk/assert/jest");
const core_1 = require("@aws-cdk/core");
const sqs_redrive_1 = require("../lib/sqs-redrive");
const aws_sqs_1 = require("@aws-cdk/aws-sqs");
describe('lambda', () => {
    test('Lambda exists', () => {
        const app = new core_1.App();
        // WHEN
        const testStack = new core_1.Stack(app, 'test-stack');
        let mainQueue = new aws_sqs_1.Queue(testStack, 'main-queue');
        let deadLetterQueue = new aws_sqs_1.Queue(testStack, 'dlq-queue');
        new sqs_redrive_1.SqsRedrive(testStack, 'test-construct', { mainQueue: mainQueue, deadLetterQueue: deadLetterQueue });
        // THEN
        expect(testStack).toHaveResource("AWS::Lambda::Function");
        /*
            expect(testStack).toHaveResourceLike('AWS::Lambda::Function', {
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
        */
    });
    test('Lambda has right policy to read/write queues', () => {
        const app = new core_1.App();
        // WHEN
        const testStack = new core_1.Stack(app, 'test-stack');
        let mainQueue = new aws_sqs_1.Queue(testStack, 'main-queue');
        let deadLetterQueue = new aws_sqs_1.Queue(testStack, 'dlq-queue');
        new sqs_redrive_1.SqsRedrive(testStack, 'test-construct', { mainQueue: mainQueue, deadLetterQueue: deadLetterQueue });
        // THEN
        expect(testStack).toHaveResourceLike('AWS::IAM::Policy' /*, {
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
      }*/);
    });
    test('Lambda uses passed props', () => {
        const app = new core_1.App();
        // WHEN
        const testStack = new core_1.Stack(app, 'test-stack');
        let mainQueue = new aws_sqs_1.Queue(testStack, 'main-queue');
        let deadLetterQueue = new aws_sqs_1.Queue(testStack, 'dlq-queue');
        new sqs_redrive_1.SqsRedrive(testStack, 'test-construct', {
            mainQueue: mainQueue, deadLetterQueue: deadLetterQueue, lambdaProps: {
                functionName: 'my-own-function-name',
                environment: {
                    should: 'exist'
                },
                timeout: core_1.Duration.minutes(1)
            }
        });
        // THEN
        expect(testStack).toHaveResourceLike('AWS::Lambda::Function', {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FzLXJlZHJpdmUtY29uc3RydWN0LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcXMtcmVkcml2ZS1jb25zdHJ1Y3QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdDQUE4QjtBQUM5Qix3Q0FBcUQ7QUFDckQsb0RBQWdEO0FBQ2hELDhDQUF5QztBQUV6QyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtJQUd0QixJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN6QixNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQUcsRUFBRSxDQUFDO1FBQ3RCLE9BQU87UUFFUCxNQUFNLFNBQVMsR0FBRyxJQUFJLFlBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDL0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxlQUFLLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ25ELElBQUksZUFBZSxHQUFHLElBQUksZUFBSyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUV4RCxJQUFJLHdCQUFVLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFDLENBQUMsQ0FBQztRQUV0RyxPQUFPO1FBRVAsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzFEOzs7Ozs7Ozs7Ozs7O1VBYUU7SUFDSixDQUFDLENBQUMsQ0FBQztJQUdILElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxHQUFHLEVBQUU7UUFDeEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFHLEVBQUUsQ0FBQztRQUN0QixPQUFPO1FBRVAsTUFBTSxTQUFTLEdBQUcsSUFBSSxZQUFLLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQy9DLElBQUksU0FBUyxHQUFHLElBQUksZUFBSyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNuRCxJQUFJLGVBQWUsR0FBRyxJQUFJLGVBQUssQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFeEQsSUFBSSx3QkFBVSxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBQyxDQUFDLENBQUM7UUFDdEcsT0FBTztRQUVQLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBMEN0RCxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7UUFDcEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFHLEVBQUUsQ0FBQztRQUN0QixPQUFPO1FBRVAsTUFBTSxTQUFTLEdBQUcsSUFBSSxZQUFLLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQy9DLElBQUksU0FBUyxHQUFHLElBQUksZUFBSyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNuRCxJQUFJLGVBQWUsR0FBRyxJQUFJLGVBQUssQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFeEQsSUFBSSx3QkFBVSxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRTtZQUMxQyxTQUFTLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFO2dCQUNuRSxZQUFZLEVBQUUsc0JBQXNCO2dCQUNwQyxXQUFXLEVBQUU7b0JBQ1gsTUFBTSxFQUFFLE9BQU87aUJBQ2hCO2dCQUNELE9BQU8sRUFBRSxlQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUM3QjtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU87UUFFUCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsa0JBQWtCLENBQUMsdUJBQXVCLEVBQUU7WUFDNUQsYUFBYSxFQUFFO2dCQUNiLFdBQVcsRUFBRTtvQkFDWCxXQUFXLEVBQUU7d0JBQ1gsS0FBSyxFQUFFLG1CQUFtQjtxQkFDM0I7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULEtBQUssRUFBRSxrQkFBa0I7cUJBQzFCO29CQUNELFFBQVEsRUFBRSxPQUFPO2lCQUNsQjthQUNGO1lBQ0QsY0FBYyxFQUFFLHNCQUFzQjtZQUN0QyxTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ0Bhd3MtY2RrL2Fzc2VydC9qZXN0JztcbmltcG9ydCB7IEFwcCwgRHVyYXRpb24sIFN0YWNrIH0gZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgeyBTcXNSZWRyaXZlIH0gZnJvbSBcIi4uL2xpYi9zcXMtcmVkcml2ZVwiO1xuaW1wb3J0IHsgUXVldWUgfSBmcm9tIFwiQGF3cy1jZGsvYXdzLXNxc1wiO1xuXG5kZXNjcmliZSgnbGFtYmRhJywgKCkgPT4ge1xuXG5cbiAgdGVzdCgnTGFtYmRhIGV4aXN0cycsICgpID0+IHtcbiAgICBjb25zdCBhcHAgPSBuZXcgQXBwKCk7XG4gICAgLy8gV0hFTlxuXG4gICAgY29uc3QgdGVzdFN0YWNrID0gbmV3IFN0YWNrKGFwcCwgJ3Rlc3Qtc3RhY2snKTtcbiAgICBsZXQgbWFpblF1ZXVlID0gbmV3IFF1ZXVlKHRlc3RTdGFjaywgJ21haW4tcXVldWUnKTtcbiAgICBsZXQgZGVhZExldHRlclF1ZXVlID0gbmV3IFF1ZXVlKHRlc3RTdGFjaywgJ2RscS1xdWV1ZScpO1xuXG4gICAgbmV3IFNxc1JlZHJpdmUodGVzdFN0YWNrLCAndGVzdC1jb25zdHJ1Y3QnLCB7bWFpblF1ZXVlOiBtYWluUXVldWUsIGRlYWRMZXR0ZXJRdWV1ZTogZGVhZExldHRlclF1ZXVlfSk7XG5cbiAgICAvLyBUSEVOXG5cbiAgICBleHBlY3QodGVzdFN0YWNrKS50b0hhdmVSZXNvdXJjZShcIkFXUzo6TGFtYmRhOjpGdW5jdGlvblwiKTtcbiAgICAvKlxuICAgICAgICBleHBlY3QodGVzdFN0YWNrKS50b0hhdmVSZXNvdXJjZUxpa2UoJ0FXUzo6TGFtYmRhOjpGdW5jdGlvbicsIHtcbiAgICAgICAgICBcIkVudmlyb25tZW50XCI6IHtcbiAgICAgICAgICAgIFwiVmFyaWFibGVzXCI6IHtcbiAgICAgICAgICAgICAgXCJRVUVVRV9VUkxcIjoge1xuICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwibWFpbnF1ZXVlMjJCODQzMzFcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIkRMUV9VUkxcIjoge1xuICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiZGxxcXVldWVDQTM5NjIyRFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICovXG4gIH0pO1xuXG5cbiAgdGVzdCgnTGFtYmRhIGhhcyByaWdodCBwb2xpY3kgdG8gcmVhZC93cml0ZSBxdWV1ZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuICAgIC8vIFdIRU5cblxuICAgIGNvbnN0IHRlc3RTdGFjayA9IG5ldyBTdGFjayhhcHAsICd0ZXN0LXN0YWNrJyk7XG4gICAgbGV0IG1haW5RdWV1ZSA9IG5ldyBRdWV1ZSh0ZXN0U3RhY2ssICdtYWluLXF1ZXVlJyk7XG4gICAgbGV0IGRlYWRMZXR0ZXJRdWV1ZSA9IG5ldyBRdWV1ZSh0ZXN0U3RhY2ssICdkbHEtcXVldWUnKTtcblxuICAgIG5ldyBTcXNSZWRyaXZlKHRlc3RTdGFjaywgJ3Rlc3QtY29uc3RydWN0Jywge21haW5RdWV1ZTogbWFpblF1ZXVlLCBkZWFkTGV0dGVyUXVldWU6IGRlYWRMZXR0ZXJRdWV1ZX0pO1xuICAgIC8vIFRIRU5cblxuICAgIGV4cGVjdCh0ZXN0U3RhY2spLnRvSGF2ZVJlc291cmNlTGlrZSgnQVdTOjpJQU06OlBvbGljeScvKiwge1xuICAgIFwiUG9saWN5RG9jdW1lbnRcIjoge1xuICAgICAgXCJTdGF0ZW1lbnRcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJBY3Rpb25cIjogW1xuICAgICAgICAgICAgXCJzcXM6UmVjZWl2ZU1lc3NhZ2VcIixcbiAgICAgICAgICAgIFwic3FzOkNoYW5nZU1lc3NhZ2VWaXNpYmlsaXR5XCIsXG4gICAgICAgICAgICBcInNxczpHZXRRdWV1ZVVybFwiLFxuICAgICAgICAgICAgXCJzcXM6RGVsZXRlTWVzc2FnZVwiLFxuICAgICAgICAgICAgXCJzcXM6R2V0UXVldWVBdHRyaWJ1dGVzXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiRWZmZWN0XCI6IFwiQWxsb3dcIixcbiAgICAgICAgICBcIlJlc291cmNlXCI6IHtcbiAgICAgICAgICAgIFwiRm46OkdldEF0dFwiOiBbXG4gICAgICAgICAgICAgIFwiZGxxcXVldWVDQTM5NjIyRFwiLFxuICAgICAgICAgICAgICBcIkFyblwiXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJBY3Rpb25cIjogW1xuICAgICAgICAgICAgXCJzcXM6U2VuZE1lc3NhZ2VcIixcbiAgICAgICAgICAgIFwic3FzOkdldFF1ZXVlQXR0cmlidXRlc1wiLFxuICAgICAgICAgICAgXCJzcXM6R2V0UXVldWVVcmxcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJFZmZlY3RcIjogXCJBbGxvd1wiLFxuICAgICAgICAgIFwiUmVzb3VyY2VcIjoge1xuICAgICAgICAgICAgXCJGbjo6R2V0QXR0XCI6IFtcbiAgICAgICAgICAgICAgXCJtYWlucXVldWUyMkI4NDMzMVwiLFxuICAgICAgICAgICAgICBcIkFyblwiXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJWZXJzaW9uXCI6IFwiMjAxMi0xMC0xN1wiXG4gICAgfSxcbiAgICBcIlBvbGljeU5hbWVcIjogXCJ0ZXN0Y29uc3RydWN0cXVldWVyZWRyaXZlU2VydmljZVJvbGVEZWZhdWx0UG9saWN5OTg4NjZEMjhcIixcbiAgICBcIlJvbGVzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJSZWZcIjogXCJ0ZXN0Y29uc3RydWN0cXVldWVyZWRyaXZlU2VydmljZVJvbGVFRDk1MzRCMFwiXG4gICAgICB9XG4gICAgXVxuICB9Ki8pO1xuICB9KTtcblxuICB0ZXN0KCdMYW1iZGEgdXNlcyBwYXNzZWQgcHJvcHMnLCAoKSA9PiB7XG4gICAgY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuICAgIC8vIFdIRU5cblxuICAgIGNvbnN0IHRlc3RTdGFjayA9IG5ldyBTdGFjayhhcHAsICd0ZXN0LXN0YWNrJyk7XG4gICAgbGV0IG1haW5RdWV1ZSA9IG5ldyBRdWV1ZSh0ZXN0U3RhY2ssICdtYWluLXF1ZXVlJyk7XG4gICAgbGV0IGRlYWRMZXR0ZXJRdWV1ZSA9IG5ldyBRdWV1ZSh0ZXN0U3RhY2ssICdkbHEtcXVldWUnKTtcblxuICAgIG5ldyBTcXNSZWRyaXZlKHRlc3RTdGFjaywgJ3Rlc3QtY29uc3RydWN0Jywge1xuICAgICAgbWFpblF1ZXVlOiBtYWluUXVldWUsIGRlYWRMZXR0ZXJRdWV1ZTogZGVhZExldHRlclF1ZXVlLCBsYW1iZGFQcm9wczoge1xuICAgICAgICBmdW5jdGlvbk5hbWU6ICdteS1vd24tZnVuY3Rpb24tbmFtZScsXG4gICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgc2hvdWxkOiAnZXhpc3QnXG4gICAgICAgIH0sXG4gICAgICAgIHRpbWVvdXQ6IER1cmF0aW9uLm1pbnV0ZXMoMSlcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBUSEVOXG5cbiAgICBleHBlY3QodGVzdFN0YWNrKS50b0hhdmVSZXNvdXJjZUxpa2UoJ0FXUzo6TGFtYmRhOjpGdW5jdGlvbicsIHtcbiAgICAgIFwiRW52aXJvbm1lbnRcIjoge1xuICAgICAgICBcIlZhcmlhYmxlc1wiOiB7XG4gICAgICAgICAgXCJRVUVVRV9VUkxcIjoge1xuICAgICAgICAgICAgXCJSZWZcIjogXCJtYWlucXVldWUyMkI4NDMzMVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIkRMUV9VUkxcIjoge1xuICAgICAgICAgICAgXCJSZWZcIjogXCJkbHFxdWV1ZUNBMzk2MjJEXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvdWxkXCI6IFwiZXhpc3RcIlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJGdW5jdGlvbk5hbWVcIjogXCJteS1vd24tZnVuY3Rpb24tbmFtZVwiLFxuICAgICAgXCJUaW1lb3V0XCI6IDYwXG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=