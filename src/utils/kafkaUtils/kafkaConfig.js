const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'akhilesh', 
  brokers: ['localhost:9092'], 
});

module.exports = {
  kafka,
};
