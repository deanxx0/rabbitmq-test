const amqp = require('amqplib');

const connect = async () => {
  try {
    const amqpServer = 'amqp://localhost:5672';
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    const queueName = 'testQ';
    await channel.assertQueue(queueName);
    channel.consume(queueName, message => {
      const input = JSON.parse(message.content.toString());
      console.log(`consumed message: ${input.number}`);
      channel.ack(message);
      // if (input.number % 3 == 0) {
      //   channel.ack(message);
      // }
      console.log('waiting message...');
    });
  } catch (error) {
    console.error(error.message);
  }
}

connect();