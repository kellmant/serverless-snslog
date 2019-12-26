## Modules

<dl>
<dt><a href="#module_handler">handler</a></dt>
<dd><p>Lambda serverless handler.<br>Creates a SNS topic and allows subscribe and post
to the topic through simple HTTPS calls with x-api-key header token
Dependant on the serverless framework.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ResponseMetadata">ResponseMetadata</a> : <code>Object</code></dt>
<dd><p>Return value for published message</p>
</dd>
<dt><a href="#event">event</a> : <code>Object</code></dt>
<dd><p>POST data format to lambda function</p>
</dd>
</dl>

<a name="module_handler"></a>

## handler
Lambda serverless handler.   
Creates a SNS topic and allows subscribe and post
to the topic through simple HTTPS calls with x-api-key header token
Dependant on the serverless framework.

**See**: [https://github.com/serverless/serverless](https://github.com/serverless/serverless)  

* [handler](#module_handler)
    * [.pub()](#module_handler.pub) ⇒ [<code>ResponseMetadata</code>](#ResponseMetadata)
    * [.sub()](#module_handler.sub) ⇒ [<code>ResponseMetadata</code>](#ResponseMetadata)
    * [.unsub()](#module_handler.unsub) ⇒ [<code>ResponseMetadata</code>](#ResponseMetadata)

<a name="module_handler.pub"></a>

### handler.pub() ⇒ [<code>ResponseMetadata</code>](#ResponseMetadata)
Publish message to SNS topic

**Kind**: static method of [<code>handler</code>](#module_handler)  
**Returns**: [<code>ResponseMetadata</code>](#ResponseMetadata) - - MessageId status of message being sent  
**See**: [https://s3.amazonaws.com/cdn.seclab.cloud/snslog.tar.gz](https://s3.amazonaws.com/cdn.seclab.cloud/snslog.tar.gz) for example of endpoint logging client to SNS  

| Param | Type | Description |
| --- | --- | --- |
| event.body.message | [<code>event</code>](#event) | text message to publish |

<a name="module_handler.sub"></a>

### handler.sub() ⇒ [<code>ResponseMetadata</code>](#ResponseMetadata)
Subscribe to messages with email or text

**Kind**: static method of [<code>handler</code>](#module_handler)  
**Returns**: [<code>ResponseMetadata</code>](#ResponseMetadata) - - SubscriptionArn of the subscribed user  

| Param | Type | Description |
| --- | --- | --- |
| event.body.email | [<code>event</code>](#event) | set protocol and endpoint to recieve updates via email |
| event.body.sms | [<code>event</code>](#event) | set protocol and endpoint to recieve updates via sms text |

<a name="module_handler.unsub"></a>

### handler.unsub() ⇒ [<code>ResponseMetadata</code>](#ResponseMetadata)
Unsubscribe from messages

**Kind**: static method of [<code>handler</code>](#module_handler)  
**Returns**: [<code>ResponseMetadata</code>](#ResponseMetadata) - - confirmation of subscriber removal  

| Param | Type | Description |
| --- | --- | --- |
| event.body.sub | [<code>event</code>](#event) | SubscriptionArn returned from subscribe request |

<a name="ResponseMetadata"></a>

## ResponseMetadata : <code>Object</code>
Return value for published message

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| MessageId | <code>String</code> | 
| SubscriptionArn | <code>String</code> | 

<a name="event"></a>

## event : <code>Object</code>
POST data format to lambda function

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event.body | <code>Object</code> | content in the body of the post |
| event.body.message | <code>String</code> | message to publish to subscribers |
| event.body.email | <code>String</code> | email sending protocol for messages in the format user@domain |
| event.body.sms | <code>String</code> | sms text number in the format +15551230000 |
| event.body.sub | <code>String</code> | SubscriptionArn from AWS to unsubscribe |

