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
  * **deadLetterQueue** (<code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code>)  *No description* 
  * **mainQueue** (<code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code>)  *No description* 
  * **lambdaProps** (<code>[NodejsFunctionProps](#aws-cdk-aws-lambda-nodejs-nodejsfunctionprops)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**redriveFunction** | <code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code> | <span></span>



## struct SqsRedriveProps  <a id="matthewbonig-sqs-redrive-sqsredriveprops"></a>






Name | Type | Description 
-----|------|-------------
**deadLetterQueue** | <code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code> | <span></span>
**mainQueue** | <code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code> | <span></span>
**lambdaProps**? | <code>[NodejsFunctionProps](#aws-cdk-aws-lambda-nodejs-nodejsfunctionprops)</code> | __*Optional*__



