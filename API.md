# API Reference

**Classes**

Name|Description
----|-----------
[SqsRedrive](#matthewbonig-sqs-redrive-sqsredrive)|*No description*


**Structs**

Name|Description
----|-----------
[SqsRedriveProps](#matthewbonig-sqs-redrive-sqsredriveprops)|*No description*



## class SqsRedrive  <a id="matthewbonig-sqs-redrive-sqsredrive"></a>



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
  * **lambdaProps** (<code>[NodejsFunctionProps](#aws-cdk-aws-lambda-nodejs-nodejsfunctionprops)</code>)  The underlying Lambda Function that does all the heavy lifting. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**redriveFunction** | <code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code> | <span></span>



## struct SqsRedriveProps  <a id="matthewbonig-sqs-redrive-sqsredriveprops"></a>






Name | Type | Description 
-----|------|-------------
**deadLetterQueue** | <code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code> | The SQS Queue that holds dead-letters.
**mainQueue** | <code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code> | The SQS Queue that will re-process the DLQ messages.
**lambdaProps**? | <code>[NodejsFunctionProps](#aws-cdk-aws-lambda-nodejs-nodejsfunctionprops)</code> | The underlying Lambda Function that does all the heavy lifting.<br/>__*Optional*__



