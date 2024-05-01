const { Kafka } = require('kafkajs');
const config = require('./kafkaConfig'); // Kafka configuration file

async function produceMessage(topic, message) {
  try {
    const producer = config.kafka.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
    console.log('Message sent successfully');
    await producer.disconnect();
  } catch (error) {
    console.error('Error producing message:', error);
  }
}

module.exports = produceMessage;
