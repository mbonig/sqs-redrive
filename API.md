# API Reference

**Classes**

Name|Description
----|-----------
[SqsRedrive](#matthewbonig-sqs-redrive-sqsredrive)|A construct that encompasses a Lambda Function that will move all messages from a source queue (dlq) to a destination queue (main).


**Structs**

Name|Description
----|-----------
[SqsRedriveProps](#matthewbonig-sqs-redrive-sqsredriveprops)|Props for the SqsRedrive construct creation.



## class SqsRedrive  <a id="matthewbonig-sqs-redrive-sqsredrive"></a>

A construct that encompasses a Lambda Function that will move all messages from a source queue (dlq) to a destination queue (main).

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new SqsRedrive(scope: Construct, id: string, props: SqsRedriveProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SqsRedriveProps](#matthewbonig-sqs-redrive-sqsredriveprops)</code>)  *No description*
  * **deadLetterQueue** (<code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code>)  The SQS Queue that holds dead-letters. 
  * **mainQueue** (<code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code>)  The SQS Queue that will re-process the DLQ messages. 
  * **lambdaProps** (<code>[NodejsFunctionProps](#aws-cdk-aws-lambda-nodejs-nodejsfunctionprops)</code>)  Props to hand to the underlying Lambda Function that does all the heavy lifting. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**redriveFunction** | <code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code> | The Lambda Function that will move messages from the DLQ to the main queue.



## struct SqsRedriveProps  <a id="matthewbonig-sqs-redrive-sqsredriveprops"></a>


Props for the SqsRedrive construct creation.



Name | Type | Description 
-----|------|-------------
**deadLetterQueue** | <code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code> | The SQS Queue that holds dead-letters.
**mainQueue** | <code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code> | The SQS Queue that will re-process the DLQ messages.
**lambdaProps**? | <code>[NodejsFunctionProps](#aws-cdk-aws-lambda-nodejs-nodejsfunctionprops)</code> | Props to hand to the underlying Lambda Function that does all the heavy lifting.<br/>__*Optional*__



