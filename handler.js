'use strict';
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

/**
 * @fileOverview Serverless lambda handler and deployment Yaml 
 * @author Kellman
 * @version 1.1
 */

/**
 * Return value for published message
 * @typedef {Object} ResponseMetadata
 * @property {String} MessageId
 * @property {String} SubscriptionArn
 */

/**
 * POST data format to lambda function
 * @typedef {Object} event - Lambda POST event to sns service
 * @property {Object} event.body - content in the body of the post
 * @property {String} event.body.message - message to publish to subscribers
 * @property {String} event.body.email - email sending protocol for messages in the format user@domain
 * @property {String} event.body.sms - sms text number in the format +15551230000
 * @property {String} event.body.sub SubscriptionArn from AWS to unsubscribe
 */

/**
 * Lambda serverless handler.   
 * Creates a SNS topic and allows subscribe and post
 * to the topic through simple HTTPS calls with x-api-key header token
 * Dependant on the serverless framework.
 * @see {@link https://github.com/serverless/serverless }
 * @module
 */

/**
 * Publish message to SNS topic
 * @param {event} event.body.message - text message to publish
 * @returns {ResponseMetadata} - MessageId status of message being sent
 * @see {@link https://s3.amazonaws.com/cdn.seclab.cloud/snslog.tar.gz } for example of endpoint logging client to SNS
 */
module.exports.pub = async event => {
  try {
    var stat = await JSON.parse(event.body)
    console.log('Status message is  ' + stat.message)
    var sns = new AWS.SNS();
    var params = {
      TopicArn: process.env.TOPIC_ARN,
      Message: stat.message
    }
    var result = await sns.publish(params).promise()
    const response = {
			statusCode: 200,
			body: JSON.stringify(result)
		}
		return response
	} catch (err) {
    console.log(err.stack)
        return {
            statusCode: 200,
            body: 'Error: message send failed'
        }
	  }
} 

/**
 * Subscribe to messages with email or text
 * @param {event} event.body.email - set protocol and endpoint to recieve updates via email
 * @param {event} event.body.sms - set protocol and endpoint to recieve updates via sms text
 * @returns {ResponseMetadata} - SubscriptionArn of the subscribed user 
 */
module.exports.sub = async event => {
  try {
    var proto = ''
    var endpoint = ''
    var subreq = await JSON.parse(event.body)
    if (subreq.email) {
      proto = 'email'
      endpoint = subreq.email
    }
    if (subreq.sms) {
      proto = 'sms'
      endpoint = subreq.sms
    }
    var sns = new AWS.SNS();
    var params = {
      TopicArn: process.env.TOPIC_ARN,
      Protocol: proto,
      Endpoint: endpoint,
      ReturnSubscriptionArn: true
    }
    var result = await sns.subscribe(params).promise()
    const response = {
			statusCode: 200,
			body: JSON.stringify(result)
		}
		return response
	} catch (err) {
    console.log(err.stack)
        return {
            statusCode: 200,
            body: 'Error: subscribe failed'
        }
	  }
} 



/**
 * Unsubscribe from messages
 * @param {event} event.body.sub - SubscriptionArn returned from subscribe request
 * @returns {ResponseMetadata} - confirmation of subscriber removal 
*/
module.exports.unsub = async event => {
  try {
    var unsubreq = await JSON.parse(event.body)
    var sns = new AWS.SNS();
    var params = {
      SubscriptionArn: unsubreq.sub
    }
    var result = await sns.unsubscribe(params).promise()
    const response = {
			statusCode: 200,
			body: JSON.stringify(result)
		}
		return response
	} catch (err) {
    console.log(err.stack)
        return {
            statusCode: 200,
            body: 'Error: unsubscribe failed.'
        }
	  }
} 
