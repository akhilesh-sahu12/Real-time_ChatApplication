const { Kafka } = require('kafkajs');
const config = require('./kafkaConfig'); // a Kafka configuration file

async function consumeMessages(topic) {
  try {
    const consumer = config.kafka.consumer({ groupId: 'test-group' });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
      },
    });
  } catch (error) {
    console.error('Error consuming messages:', error);
  }
}

module.exports = consumeMessages;
