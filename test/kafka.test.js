const { Kafka } = require('kafkajs');
const produceMessage = require('../src/utils/kafkaUtils/kafkaProducer');
const consumeMessages = require('../src/utils/kafkaUtils/kafkaConsumer');

// Mock the Kafka module
jest.mock('kafkajs');

describe('Kafka Producer', () => {
  test('It should produce a message', async () => {
    const mockProducer = {
      connect: jest.fn(),
      send: jest.fn().mockResolvedValue(),
      disconnect: jest.fn(),
    };

    Kafka.prototype.producer.mockReturnValue(mockProducer);

    await produceMessage('test-topic', 'Test message');

    expect(mockProducer.connect).toHaveBeenCalled();
    expect(mockProducer.send).toHaveBeenCalledWith({
      topic: 'test-topic',
      messages: [{ value: 'Test message' }],
    });
    expect(mockProducer.disconnect).toHaveBeenCalled();
  });
});

describe('Kafka Consumer', () => {
  test('It should consume messages', async () => {
    const mockConsumer = {
      connect: jest.fn(),
      subscribe: jest.fn(),
      run: jest.fn().mockImplementationOnce(({ eachMessage }) => {
        const message = {
          topic: 'test-topic',
          partition: 0,
          message: { value: 'Test message' },
        };
        eachMessage(message);
      }),
    };

    Kafka.prototype.consumer.mockReturnValue(mockConsumer);

    await consumeMessages('test-topic');

    expect(mockConsumer.connect).toHaveBeenCalled();
    expect(mockConsumer.subscribe).toHaveBeenCalledWith({ topic: 'test-topic', fromBeginning: true });
    expect(mockConsumer.run).toHaveBeenCalled();
  });
});
