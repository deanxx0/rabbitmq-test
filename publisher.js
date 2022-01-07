const amqp = require('amqplib');

const msg = {number: process.argv[2]};

const connect = async () => {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    const queueName = 'testQ';
    await channel.assertQueue(queueName);
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
    console.log(`msg sent: ${msg.number}`);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error.message);
  }
}

connect();